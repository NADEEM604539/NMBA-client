import db from "@/lib/db";
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request) {
  try {
    const user = await currentUser();

    const email = user.emailAddresses[0].emailAddress;

    // Get the user's ID from your `users` table
    const [userRows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);

    if (userRows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found in DB' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userId = userRows[0].id;

    // Get cart count
    const [cartRows] = await db.query('SELECT COUNT(*) as count FROM cart_items WHERE user_id = ?', [userId]);
    const count = cartRows[0].count;

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error in GET:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
