import db from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const [rows] = await db.query(
      `SELECT ci.id, ci.quantity, p.name, p.price, p.image_url_1, p.image_url_2, p.quantity as available_quantity, p.id AS product_id
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = ? AND p.is_deleted = 0
       ORDER BY ci.id DESC`,
      [userId]
    );
    return Response.json(rows);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch cart" }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    let product_id, quantity;
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await request.json();
      product_id = body.product_id;
      quantity = body.quantity || 1;
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await request.formData();
      product_id = Number(form.get("product_id"));
      quantity = Number(form.get("quantity")) || 1;
    } else {
      const form = await request.formData();
      product_id = Number(form.get("product_id"));
      quantity = Number(form.get("quantity")) || 1;
    }
    
    if (!product_id) {
      return new Response(JSON.stringify({ error: "product_id is required" }), { status: 400 });
    }
    
    if (quantity < 1) {
      return new Response(JSON.stringify({ error: "Quantity must be at least 1" }), { status: 400 });
    }
    
    // Check product exists and has stock
    const [productRows] = await db.query(
      "SELECT id, quantity, is_deleted FROM products WHERE id = ?",
      [product_id]
    );
    
    if (!productRows[0]) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }
    
    if (productRows[0].is_deleted) {
      return new Response(JSON.stringify({ error: "Product is no longer available" }), { status: 400 });
    }
    
    if (productRows[0].quantity <= 0) {
      return new Response(JSON.stringify({ error: "Product is out of stock" }), { status: 400 });
    }
    
    if (quantity > productRows[0].quantity) {
      return new Response(JSON.stringify({ 
        error: `Only ${productRows[0].quantity} item(s) available in stock` 
      }), { status: 400 });
    }
    
    // Check if item already exists in cart
    const [existingCart] = await db.query(
      "SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, product_id]
    );
    
    if (existingCart[0]) {
      // Update existing cart item
      const newQuantity = existingCart[0].quantity + quantity;
      
      if (newQuantity > productRows[0].quantity) {
        return new Response(JSON.stringify({ 
          error: `Only ${productRows[0].quantity} item(s) available. You already have ${existingCart[0].quantity} in cart.` 
        }), { status: 400 });
      }
      
      await db.query(
        "UPDATE cart_items SET quantity = ? WHERE id = ?",
        [newQuantity, existingCart[0].id]
      );
    } else {
      // Insert new cart item
      await db.query(
        "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [userId, product_id, quantity]
      );
    }
    
    const accept = request.headers.get("accept") || "";
    if (accept.includes("text/html")) {
      return new Response(null, { status: 302, headers: { Location: "/cart" } });
    }
    return Response.json({ ok: true, redirect: "/cart" });
  } catch (e) {
    console.error("Cart POST error:", e);
    return new Response(JSON.stringify({ error: "Failed to add to cart" }), { status: 500 });
  }
}


