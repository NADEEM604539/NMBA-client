import db from "@/lib/db";
import ProductPageClient from "./ProductPageClient";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const [rows] = await db.query(
      "SELECT name, description, image_url_1, price FROM products WHERE id = ? AND is_deleted = 0",
      [id]
    );

    if (rows.length === 0) {
      return {
        title: "Product Not Found",
      };
    }

    const product = rows[0];

    return {
      title: product.name,
      description: product.description.substring(0, 160),
      openGraph: {
        title: product.name,
        description: product.description.substring(0, 160),
        images: [product.image_url_1],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description.substring(0, 160),
        images: [product.image_url_1],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Details",
    };
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  // Fetch product and reviews on the server
  let product = null;
  let reviews = [];

  try {
    const [pRows] = await db.query("SELECT * FROM products WHERE id = ? AND is_deleted = 0", [id]);
    if (pRows.length > 0) {
      product = JSON.parse(JSON.stringify(pRows[0])); // Plain object for client component
    }

    const [rRows] = await db.query(
      "SELECT r.id, r.rating, r.comment, u.name as user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ? ORDER BY r.created_at DESC",
      [id]
    );
    reviews = JSON.parse(JSON.stringify(rRows));
  } catch (error) {
    console.error("Error fetching product data:", error);
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817] relative overflow-hidden">
          {/* Glowing background orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#1a4d42]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#102C26]/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center py-20">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="inline-block w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-6xl">🔍</span>
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-5xl font-extrabold text-[#102C26] mb-4">
              Product Not Found
            </h1>

            {/* Error Message */}
            <p className="text-xl text-[#6B4F2F] mb-8 leading-relaxed">
              Sorry, the product you're looking for doesn't exist or has been removed from our catalog.
            </p>

            {/* Additional Info */}
            <p className="text-[#A79277] mb-12">
              It might have been sold out, discontinued, or the link might be broken.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-[#1a4d42] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0d3a33] transition-colors shadow-lg hover:shadow-xl"
              >
                ← Back to Home
              </Link>
              <Link
                href="/products"
                className="inline-block bg-white border-2 border-[#1a4d42] text-[#1a4d42] px-8 py-4 rounded-xl font-semibold hover:bg-[#1a4d42] hover:text-white transition-all shadow-lg hover:shadow-xl"
              >
                Browse All Products
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-16 p-8 bg-white border-2 border-[#F7E7CE] rounded-2xl shadow-lg">
              <p className="text-[#102C26] font-semibold mb-3">Need Help?</p>
              <p className="text-[#6B4F2F] mb-4">
                If you think this is an error, please contact our support team.
              </p>
              <a
                href="mailto:abidamansoora016@gmail.com"
                className="text-[#1a4d42] hover:text-[#0d3a33] font-semibold transition-colors"
              >
                📧 Get Support
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image_url_1,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'PKR',
      availability: product.quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://www.pehno.pk/products/${id}`
    },
    brand: {
      '@type': 'Brand',
      name: "Pehno by Sajeel Nawaz"
    }
  };

  // Add aggregate rating if reviews exist
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: reviews.length
    };
    jsonLd.review = reviews.slice(0, 5).map(r => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating
      },
      author: {
        '@type': 'Person',
        name: r.user_name || "Anonymous"
      },
      reviewBody: r.comment
    }));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageClient initialProduct={product} initialReviews={reviews} />
    </>
  );
}
