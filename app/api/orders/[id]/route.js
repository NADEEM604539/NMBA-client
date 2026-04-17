import db from "@/lib/db";
import { currentUser } from '@clerk/nextjs/server';

export async function GET(_req, { params }) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const email = user.emailAddresses[0].emailAddress;

    // Get the user's ID from your `users` table
    const [userRows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);

    if (userRows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found in DB' }), {
        status: 404,
      });
    }

    const userId = userRows[0].id;
    const { id } = params;
    const [[order]] = await db.query(
      "SELECT id, total_price, status, created_at FROM orders WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    if (!order) return new Response("Not found", { status: 404 });

    const [items] = await db.query(
      `SELECT oi.product_id, p.name, oi.quantity, oi.price
       FROM order_items oi JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = ?`,
      [id]
    );
    return Response.json({ ...order, items });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch order" }), { status: 500 });
  }
}


