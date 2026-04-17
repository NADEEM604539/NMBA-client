import db from "@/lib/db";

export async function GET() {
  try {
    // Get all deals regardless of stock status
    const [rows] = await db.query(
      "SELECT id, name, description, price, image_url_1, image_url_2, quantity, category_id FROM products WHERE deal = 1 AND is_deleted = 0 ORDER BY created_at DESC"
    );
    return Response.json(rows);
  } catch (e) {
    console.error("GET deals error:", e.message, e.code);
    return new Response(JSON.stringify({ error: "Failed to fetch deals", details: e.message }), { status: 500 });
  }
}