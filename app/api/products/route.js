import db from "@/lib/db";

export async function GET() {
  try {
    // Get all products that are NOT deals (regardless of stock status)
    const [rows] = await db.query(
      "SELECT id, name, description, price, image_url_1, image_url_2, quantity, category_id FROM products WHERE deal = 0 AND is_deleted = 0 ORDER BY created_at DESC"
    );
    return Response.json(rows);
  } catch (e) {
    console.error("GET products error:", e.message, e.code);
    return new Response(JSON.stringify({ error: "Failed to fetch products", details: e.message }), { status: 500 });
  }
}


