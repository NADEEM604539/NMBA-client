import db from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    let userId = await getCurrentUserId();
    
    // If user doesn't exist in DB, try to create them from Clerk
    if (!userId) {
      const user = await currentUser();
      if (!user?.emailAddresses?.[0]?.emailAddress) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      }
      
      const email = user.emailAddresses[0].emailAddress;
      const name = user.firstName || user.username || "User";
      
      try {
        // Try to insert, ignore if already exists
        await db.query(
          "INSERT IGNORE INTO users (name, email, role_id) VALUES (?, ?, ?)",
          [name, email, 2]
        );
        userId = await getCurrentUserId();
      } catch (err) {
        console.error("Failed to create user:", err);
      }
      
      if (!userId) {
        return new Response(JSON.stringify({ error: "Unable to create user account. Please refresh and try again." }), { status: 400 });
      }
    }
    let product_id, rating, comment;
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      ({ product_id, rating, comment } = await request.json());
    } else {
      const form = await request.formData();
      product_id = Number(form.get("product_id"));
      rating = Number(form.get("rating"));
      comment = form.get("comment") || null;
    }
    if (!product_id || !rating) {
      return new Response(JSON.stringify({ error: "product_id and rating required" }), { status: 400 });
    }
    await db.query(
      "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
      [product_id, userId, rating, comment || null]
    );
    const accept = request.headers.get("accept") || "";
    if (accept.includes("text/html")) {
      return new Response(null, { status: 302, headers: { Location: `/products/${product_id}` } });
    }
    return Response.json({ ok: true, redirect: `/products/${product_id}` });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to add review" }), { status: 500 });
  }
}


