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

  let product = null;
  let reviews = [];

  try {
    const [pRows] = await db.query("SELECT * FROM products WHERE id = ? AND is_deleted = 0", [id]);
    if (pRows.length > 0) {
      product = JSON.parse(JSON.stringify(pRows[0]));
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
      <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black flex flex-col">
        <Navbar />

        <main className="flex-grow flex items-center justify-center py-30 px-6 md:px-16">
          <div className="max-w-2xl w-full mx-auto text-center border border-pehno-black/10 bg-white p-8 md:p-12">
            <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase font-medium">
              Archive Notice
            </span>

            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-light uppercase tracking-wide text-pehno-black">
              Product Not Found
            </h1>

            <p className="mt-6 text-pehno-charcoal text-base md:text-lg italic font-light max-w-xl mx-auto leading-relaxed">
              The product you are attempting to view does not exist or has been removed from our current collection.
            </p>

            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-pehno-charcoal/80">
              It may be sold out, discontinued, or the address link may be broken.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="w-full sm:w-auto border border-pehno-black text-pehno-black px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-pehno-black hover:text-pehno-ivory transition-colors duration-300"
              >
                &larr; Return to Home
              </Link>
              <Link
                href="/#products"
                className="w-full sm:w-auto border border-pehno-black bg-pehno-black text-pehno-ivory px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-transparent hover:text-pehno-black transition-colors duration-300"
              >
                Browse Collection
              </Link>
            </div>

            <div className="mt-16 pt-8 border-t border-pehno-black/10 text-center">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-pehno-black mb-2">
                Client Support
              </p>
              <p className="text-xs text-pehno-charcoal italic font-light mb-3">
                If you require assistance or have inquiries regarding custom orders, please contact our team.
              </p>
              <a
                href="mailto:pehnobysajeelnawaz@gmail.com"
                className="text-xs uppercase tracking-[0.2em] text-pehno-navy font-semibold hover:underline"
              >
                Contact Support &rarr;
              </a>
            </div>
          </div>
        </main>
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
      <Navbar/>
      <ProductPageClient initialProduct={product} initialReviews={reviews} />
    </>
  );
}