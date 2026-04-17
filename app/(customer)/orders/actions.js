"use server"
import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function getOrdersForCurrentUser() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  const email = user.emailAddresses?.[0]?.emailAddress;
  if (!email) throw new Error("Unauthorized");
  const [userRows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  if (!userRows?.length) throw new Error("User not found in DB");
  const userId = userRows[0].id;
  const [orders] = await db.query(
    "SELECT id, total_price, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return orders;
}

export async function getOrderDetailsForCurrentUser(orderId) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  const email = user.emailAddresses?.[0]?.emailAddress;
  if (!email) throw new Error("Unauthorized");
  const [userRows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  if (!userRows?.length) throw new Error("User not found in DB");
  const userId = userRows[0].id;

  const [[order]] = await db.query(
    "SELECT id, total_price, status, created_at FROM orders WHERE id = ? AND user_id = ?",
    [orderId, userId]
  );
  if (!order) throw new Error("Not found");
  const [items] = await db.query(
    `SELECT oi.product_id, p.name, p.image_url_1, p.image_url_2, oi.quantity, oi.price
     FROM order_items oi JOIN products p ON p.id = oi.product_id
     WHERE oi.order_id = ?`,
    [orderId]
  );
  return { ...order, items };
}


