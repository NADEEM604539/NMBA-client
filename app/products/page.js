import db from "@/lib/db";
import Navbar from "@/components/Navbar";
import ProductsPageClient from "./ProductsPageClient";

export const metadata = {
  title: "Shop Premium Shirts & Luxury Wear | NMBA Luxe Wear",
  description: "Browse our exclusive collection of premium shirts, designer clothing, and luxury garments. High-quality fabrics, contemporary designs, and affordable luxury fashion.",
};

async function fetchData() {
  try {
    // Fetch all products with category names (JOINed)
    const [products] = await db.query(
      `SELECT p.id, p.name, p.description, p.price, p.image_url_1, p.image_url_2, p.quantity, 
              p.category_id, p.deal, p.created_at, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.is_deleted = 0 
       ORDER BY p.created_at DESC`
    );

    // Fetch all categories
    const [categories] = await db.query(
      "SELECT id, name FROM categories ORDER BY name"
    );

    return {
      products: Array.isArray(products) ? products : [],
      categories: Array.isArray(categories) ? categories : [],
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], categories: [] };
  }
}

export default async function ProductsPage() {
  const { products, categories } = await fetchData();

  return (
    <div>
      <Navbar />
      <ProductsPageClient initialProducts={products} categories={categories} />
    </div>
  );
}
