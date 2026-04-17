import db from "@/lib/db";

export default async function sitemap() {
  const baseUrl = 'https://www.afias.pk';

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


  return [...staticRoutes, ...productRoutes];
}
