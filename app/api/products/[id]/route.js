import db from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const [rows] = await db.query(
      "SELECT id, name, description, price, image_url_1, image_url_2, quantity, category_id FROM products WHERE id = ? AND is_deleted = 0",
      [id]
    );
    if (!rows[0]) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
  }
}
