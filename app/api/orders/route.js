import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const email = user.emailAddresses[0].emailAddress;

    const [userRows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

    if (userRows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found in DB" }), {
        status: 404,
      });
    }

    const userId = userRows[0].id;

    const [rows] = await db.query(
      "SELECT id, total_price, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return Response.json(rows);
  } catch (e) {
    console.error("GET orders error:", e);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  const conn = await db.getConnection();
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const email = user.emailAddresses[0].emailAddress;
    const name = user.firstName || "Customer";

    const [userRows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

    if (userRows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found in DB" }), {
        status: 404,
      });
    }

    const userId = userRows[0].id;

    if (!userId) {
      await conn.release();
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await conn.beginTransaction();

    // Read contact/address/payment_method from client JSON
    let contact = null,
      address = null,
      payment_method = "cod";
    try {
      const body = await request.json();
      contact = body?.contact || null;
      address = body?.address || null;
      payment_method = body?.payment_method || "cod";
    } catch {}

    const [cartItems] = await conn.query(
      `SELECT ci.id, ci.product_id, ci.quantity, p.name AS product_name, p.price, p.quantity as available_quantity
       FROM cart_items ci JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = ?`,
      [userId]
    );

    if (cartItems.length === 0) {
      await conn.rollback();
      await conn.release();
      return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });
    }

    // Validate all items have sufficient stock
    for (const item of cartItems) {
      if (item.quantity > item.available_quantity) {
        await conn.rollback();
        await conn.release();
        return new Response(JSON.stringify({ 
          error: `Insufficient stock for "${item.product_name}". Available: ${item.available_quantity}, Requested: ${item.quantity}` 
        }), { status: 400 });
      }
    }

    const total = cartItems.reduce((s, it) => s + Number(it.price) * it.quantity, 0);
    const deliveryCharge = 200;
    const grandTotal = total + deliveryCharge;

    const [orderRes] = await conn.query(
      "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')",
      [userId, grandTotal]
    );
    const orderId = orderRes.insertId;

    // Create order items and update product quantities
    for (const it of cartItems) {
      await conn.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, it.product_id, it.quantity, it.price]
      );
      
      // Reduce product quantity
      await conn.query(
        "UPDATE products SET quantity = quantity - ? WHERE id = ?",
        [it.quantity, it.product_id]
      );
    }

    await conn.query(
      "INSERT INTO payments (order_id, contact, address, payment_method, status) VALUES (?, ?, ?, ?, 'success')",
      [orderId, contact, address, payment_method]
    );

    await conn.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);

    await conn.commit();
    await conn.release();

    // Send order confirmation email (non-blocking)
    try {
      await sendOrderConfirmationEmail({
        userEmail: email,
        userName: name,
        orderId: orderId,
        totalPrice: grandTotal,
        items: cartItems,
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the order if email fails - just log it
    }

    return Response.json({ ok: true, order_id: orderId });
  } catch (e) {
    console.error("Order error:", e);
    try {
      await conn.rollback();
    } catch {}
    try {
      await conn.release();
    } catch {}
    return new Response(JSON.stringify({ error: "Failed to place order" }), {
      status: 500,
    });
  }
}
