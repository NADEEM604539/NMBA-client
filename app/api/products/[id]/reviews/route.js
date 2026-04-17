import db from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const [rows] = await db.query(
      "SELECT r.id, r.user_id, r.rating, r.comment, r.created_at, u.name as user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ? ORDER BY r.created_at DESC",
      [id]
    );
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), { status: 500 });
  }
}
