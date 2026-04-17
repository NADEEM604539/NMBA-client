import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function getCurrentUserId() {
  const user = await currentUser();
  if (!user) return null;
  const email = user.emailAddresses?.[0]?.emailAddress;
  if (!email) return null;
  const [userRows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  if (!userRows || userRows.length === 0) return null;
  return userRows[0].id;
}


