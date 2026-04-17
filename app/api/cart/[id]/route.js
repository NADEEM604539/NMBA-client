import db from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    
    const { id } = await params;
    const body = await request.json();
    const { quantity } = body;
    
    if (!quantity || quantity < 1) {
      return new Response(JSON.stringify({ error: "quantity must be >= 1" }), { status: 400 });
    }
    
    // Get cart item to find product
    const [cartItem] = await db.query(
      "SELECT product_id FROM cart_items WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    
    if (!cartItem[0]) {
      return new Response(JSON.stringify({ error: "Cart item not found" }), { status: 404 });
    }
    
    // Check product stock
    const [product] = await db.query(
      "SELECT quantity FROM products WHERE id = ?",
      [cartItem[0].product_id]
    );
    
    if (!product[0]) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }
    
    if (quantity > product[0].quantity) {
      return new Response(JSON.stringify({ 
        error: `Only ${product[0].quantity} item(s) available in stock` 
      }), { status: 400 });
    }
    
    await db.query(
      "UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?",
      [quantity, id, userId]
    );
    
    return Response.json({ ok: true });
  } catch (e) {
    console.error("Cart PUT error:", e);
    return new Response(JSON.stringify({ error: "Failed to update item" }), { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const { id } = await params;
    await db.query("DELETE FROM cart_items WHERE id = ? AND user_id = ?", [id, userId]);
    return Response.json({ ok: true });
  } catch (e) {
    console.error("Cart DELETE error:", e);
    return new Response(JSON.stringify({ error: "Failed to remove item" }), { status: 500 });
  }
}


