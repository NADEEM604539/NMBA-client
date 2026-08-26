import db from "@/lib/db";

export default async function sitemap() {
  const baseUrl = 'https://www.pehno.pk';

  // Static routes with proper priority and change frequency
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }
  ];

  // Fetch product routes
  let productRoutes = [];
  try {
    const [products] = await db.query(
      'SELECT id, created_at FROM products WHERE is_deleted = 0'
    );
    productRoutes = (products || []).map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: product.updated_at || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  return [...staticRoutes, ...productRoutes];
}
