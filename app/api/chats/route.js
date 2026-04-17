import db from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const [rows] = await db.query(
      `SELECT c.id, c.sender_id, c.receiver_id, c.message, c.created_at,
              CASE WHEN c.sender_id = ? THEN 1 ELSE 0 END AS is_self
       FROM chats c
       WHERE (c.sender_id = ? AND c.receiver_id = 1) OR (c.sender_id = 1 AND c.receiver_id = ?)
       ORDER BY c.created_at ASC`,
      [userId, userId, userId]
    );
    return Response.json(rows);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch chats" }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const { receiver_id, message } = await request.json();
    if (!receiver_id || !message) {
      return new Response(JSON.stringify({ error: "receiver_id and message required" }), { status: 400 });
    }
    const [res] = await db.query(
      "INSERT INTO chats (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [userId, receiver_id, message]
    );
    return Response.json({ ok: true, id: res.insertId });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 500 });
  }
}


