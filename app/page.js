import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import HomePageClient from "./HomePageClient";
import db from "@/lib/db";

// Force dynamic rendering to always fetch latest data (SOLVES CACHING ISSUE)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "PEHNO | Wear Your Identity",
  description:
    "PEHNO — wear your identity. Timeless pieces, refined silhouettes, made for those who do not follow the ordinary. Discover PEHNO's first collection.",
  keywords: [
    "PEHNO", "luxury shirts", "designer clothing", "premium fashion",
    "signature shirt", "essential kurta", "tailored trouser", "signature waistcoat",
    "Pakistan fashion", "wear your identity"
  ],
  openGraph: {
    title: "PEHNO | Wear Your Identity",
    description: "Timeless pieces. Refined silhouettes. Made for those who do not follow the ordinary. Discover PEHNO.",
    type: "website",
    locale: "en_PK",
  },
};

async function fetchData() {
  try {
    // Fetch latest 6 products (optimized query with LIMIT)
const [products] = await db.query(
  `WITH RankedProducts AS (
      SELECT 
          p.id, 
          p.name, 
          p.description, 
          p.price, 
          p.image_url_1, 
          p.image_url_2, 
          p.quantity, 
          c.name AS category_name, 
          p.deal, 
          p.created_at,
          ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY p.created_at DESC) as row_num
      FROM 
          products p
      LEFT JOIN 
          categories c ON p.category_id = c.id
      WHERE 
          p.deal = 0 AND 
          p.is_deleted = 0
  )
  SELECT 
      id, 
      name, 
      description, 
      price, 
      image_url_1, 
      image_url_2, 
      quantity, 
      category_name, 
      deal, 
      created_at
  FROM 
      RankedProducts
  WHERE 
      row_num <= 8
  ORDER BY 
      category_name ASC, 
      created_at DESC;`
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
      reviews: Array.isArray(reviews) ? reviews : [],
    };
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return { products: [], deals: [], reviews: [] };
  }
}

export default async function Home() {
  const { products, reviews } = await fetchData();


  return (
    <div>
      <Navbar />
      <HomePageClient initialProducts={products} initialReviews={reviews} />
    </div>
  );
}

