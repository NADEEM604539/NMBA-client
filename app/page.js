import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import HomePageClient from "./HomePageClient";
import db from "@/lib/db";

// Force dynamic rendering to always fetch latest data (SOLVES CACHING ISSUE)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "NMBA Luxe Wear | Premium Shirts & Designer Clothing Pakistan",
  description:
    "Shop premium luxury shirts, designer clothing, and exclusive garments in Pakistan. High-quality fabrics, contemporary designs, and affordable luxury fashion for men and women.",
  keywords: [
    "luxury shirts", "designer clothing", "premium fashion", "casual wear",
    "formal shirts", "luxury garments", "Pakistan fashion", "exclusive designs",
    "quality clothing", "affordable luxury", "contemporary fashion"
  ],
  openGraph: {
    title: "NMBA Luxe Wear | Premium Shirts & Designer Clothing Pakistan",
    description: "Discover our collection of premium shirts and designer clothing. Crafted with finest fabrics and contemporary designs for the modern style-conscious individual.",
    type: "website",
    locale: "en_PK",
  },
};

async function fetchData() {
  try {
    // Fetch latest 6 products (optimized query with LIMIT)
    const [products] = await db.query(
      "SELECT id, name, description, price, image_url_1, image_url_2, quantity, category_id, deal, created_at FROM products WHERE deal = 0 AND is_deleted = 0 ORDER BY created_at DESC LIMIT 6"
    );

    // Fetch latest 3 deals (optimized query with LIMIT)
    const [deals] = await db.query(
      "SELECT id, name, description, price, image_url_1, image_url_2, quantity, category_id, deal, created_at FROM products WHERE deal = 1 AND is_deleted = 0 ORDER BY created_at DESC LIMIT 3"
    );

    // Query last 6 approved special reviews
    const [reviews] = await db.query(`
      SELECT 
        special_reviews.id,
        special_reviews.comment,
        special_reviews.rating,
        special_reviews.created_at,
        users.name AS user_name
      FROM special_reviews
      JOIN users ON special_reviews.user_id = users.id
      WHERE special_reviews.approved = true
      ORDER BY special_reviews.created_at DESC
      LIMIT 6
    `);

    return {
      products: Array.isArray(products) ? products : [],
      deals: Array.isArray(deals) ? deals : [],
      reviews: Array.isArray(reviews) ? reviews : [],
    };
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return { products: [], deals: [], reviews: [] };
  }
}

export default async function Home() {
  const { products, deals, reviews } = await fetchData();


  return (
    <div>
      <Navbar />
      <HomePageClient initialProducts={products} initialDeals={deals} initialReviews={reviews} />
    </div>
  );
}

