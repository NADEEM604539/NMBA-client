"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Mail, Plus, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";

// Fixed "first collection" roster shown while the real catalogue fills up.
// Each item has a primary + secondary image for the hover crossfade.
const SIGNATURE_ROSTER = [
  {
    id: "signature-waistcoat",
    name: "PEHNO Signature Waistcoat",
    image1: "/weist_coat.jpeg",
    image2: "/weist_coat2.jpeg",
  },
  {
    id: "essential-kurta",
    name: "PEHNO Essential Kurta",
    image1: "/shalwar_kameez.jpeg",
    image2: "/pehno3.jpeg",
  },
  {
    id: "tailored-trouser",
    name: "PEHNO Tailored Trouser",
    image1: "/tailored_trouser.jpeg",
    image2: "/pehno4.jpeg",
  },
  {
    id: "signature-shirt",
    name: "PEHNO Signature Shirt",
    image1: "/signature_shirt.jpeg",
    image2: "/pehno2.jpeg",
  },
];

const CATEGORY_GRID = [
  { label: "Waistcoats", category: "Waistcoats", image: "/weist_coat.jpeg" },
  { label: "Kurtas", category: "Suits & Kurtas", image: "/shalwar_kameez.jpeg" },
  { label: "Trousers", category: "Tailored Trousers", image: "/tailored_trouser.jpeg" },
  { label: "Shirts", category: "Signature Shirts", image: "/signature_shirt.jpeg" },
];

export default function HomePageClient({ initialProducts, initialReviews }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [notifyProduct, setNotifyProduct] = useState(null);

  // Handle global search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(initialProducts);
    } else {
      const filtered = initialProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, initialProducts]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // Define your 5 categories here. 
  // EDIT THE `matchString` TO MATCH THE EXACT CATEGORY STRINGS IN YOUR DATABASE.
  const categories = [
    {
      id: "suits-kurtas",
      title: "Suits & Kurtas",
      description: "Elegant traditional and modern ensembles for the perfect gentleman.",
      matchString: "Suits & Kurtas", // <-- Edit this string
      image: "/shalwar_kameez.jpeg" // <-- Add your image to public/images/
    },
    {
      id: "waistcoats",
      title: "Waistcoats",
      description: "Premium tailored waistcoats to elevate any traditional outfit.",
      matchString: "Waistcoats", // <-- Edit this string
      image: "/weist_coat.jpeg"
    },
    {
      id: "signature-shirts",
      title: "Signature Shirts",
      description: "Crisp, comfortable, and expertly crafted shirts.",
      matchString: "Signature Shirts", // <-- Edit this string
      image: "/signature_shirt.jpeg"
    },
    {
      id: "tailored-trousers",
      title: "Tailored Trousers",
      description: "Perfectly fitted trousers designed for both comfort and class.",
      matchString: "Tailored Trousers", // <-- Edit this string
      image: "/tailored_trouser.jpeg"
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black">

      {/* B. Hero Section — full screen */}
      <section className="relative w-full h-[60vh] min-h-[640px] overflow-hidden">
        <Image
          src="/packing.jpeg"
          alt="Model wearing PEHNO"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* Note: I added 'pt-32' or adjusted margins if you want to push the text up, 
            but keeping it 'justify-center' will perfectly center it within the 150vh space */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="mt-6 text-lg md:text-2xl text-pehno-offwhite italic font-light tracking-wide">
            wear your identity
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <Link
              href="#collections"
              className="border border-pehno-ivory text-pehno-ivory px-10 py-4 font-medium uppercase tracking-[0.2em] text-sm hover:bg-pehno-ivory hover:text-pehno-black transition-colors duration-300"
            >
              Explore Collection
            </Link>
            <span className="text-pehno-ivory/70 text-xs tracking-[0.3em] uppercase">Coming soon ✔</span>
          </div>
        </div>
      </section>
      {/* C. The Collection Banner */}
      <section className="relative py-28 px-6 md:px-16 bg-pehno-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="/coming_soon1.jpeg" alt="" fill className="object-cover blur-md scale-110" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-pehno-ivory leading-snug">
            Timeless pieces. Refined silhouettes.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-pehno-ivory/70 italic">
            Made for those who do not follow the ordinary.
          </p>
        </div>
      </section>

      {/* D. Products Display Section — signature roster with hover swap + Notify Me */}
      <section className="py-24 px-6 md:px-16 bg-pehno-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase">The First Collection</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-serif font-light text-pehno-black uppercase tracking-wide">
              Discover PEHNO
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SIGNATURE_ROSTER.map((product) => (
              <SignatureCard key={product.id} product={product} onNotify={() => setNotifyProduct(product)} />
            ))}
          </div>
        </div>
      </section>

      {/* E. Category Grid */}
      <section className="bg-pehno-offwhite pb-4">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {CATEGORY_GRID.map((block) => (
            <Link
              key={block.label}
              href={`/products?category=${block.category}`}
              className="group relative h-64 md:h-96 overflow-hidden block"
            >
              <Image
                src={block.image}
                alt={block.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center">
                <span className="text-pehno-ivory text-lg md:text-2xl font-serif tracking-[0.3em] uppercase">
                  {block.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Global Search Bar */}
      <section id="collections" className="pt-20 px-6 md:px-16 bg-pehno-offwhite">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase">Available Now</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-light text-pehno-black mb-3 uppercase tracking-wide">
            Our Collections
          </h2>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search across all categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-pehno-black placeholder-pehno-charcoal/60 border border-pehno-black/30 bg-white focus:outline-none focus:border-pehno-black focus:ring-1 focus:ring-pehno-black/20 transition-all duration-300 text-lg"
              />
              <Search className="absolute right-5 w-6 h-6 text-pehno-black pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Render The 5 Category Sections dynamically */}
      <div className="bg-pehno-offwhite pb-20">
        {categories.map((cat, index) => {
          // Filter products based on the search query AND the specific category string
          // Correct
          const categoryProducts = filteredProducts.filter(
            (p) => p.category_name === cat.matchString
          );
          // Alternating layout: even indexes have image on left, odd on right
          const isEven = index % 2 === 0;

          return (
            <section key={cat.id} className="py-16 px-6 md:px-16 border-b border-pehno-black/10 last:border-0">
              <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col lg:flex-row gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                  {/* Category Image & Info (Side 1) */}
                  <div className="w-full lg:w-1/3 text-center lg:text-left">
                    <div className="relative w-full h-80 lg:h-96 overflow-hidden shadow-xl mb-6">
                      {/* Note: Ensure these images exist in your public folder, or change the paths */}
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <h3 className="absolute bottom-6 left-6 text-2xl font-serif font-light text-white uppercase tracking-[0.15em] drop-shadow-md">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-pehno-charcoal text-lg italic">{cat.description}</p>
                    <Link href={`/products?category=${cat.matchString}`} className="mt-4 inline-block text-pehno-black font-semibold uppercase text-sm tracking-[0.15em] hover:underline">
                      View all {cat.title} &rarr;
                    </Link>
                  </div>

                  {/* Products Row (Side 2) — horizontally scrollable to fit all products */}
                  <div className="w-full lg:w-2/3">
                    {categoryProducts.length > 0 ? (
                      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-pehno-black/5 [&::-webkit-scrollbar-thumb]:bg-pehno-black/20">
                        {categoryProducts.map((product) => (
                          <div key={product.id} className="flex-shrink-0 w-64 sm:w-72 snap-start">
                            <ProductCard product={product} isDeal={false} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center p-12 bg-white border border-dashed border-pehno-black/20">
                        <p className="text-pehno-charcoal text-lg">No products found in this category right now.</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* F. The PEHNO Story */}
      <section id="story" className="py-24 px-6 md:px-16 bg-pehno-ivory">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-[420px] lg:h-[520px] overflow-hidden shadow-xl order-2 lg:order-1">
            <Image src="/pehno2.jpeg" alt="The PEHNO Story" fill className="object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase">More than what you wear</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-serif font-light text-pehno-black uppercase tracking-wide">
              The PEHNO Story
            </h2>
            <p className="mt-6 text-pehno-charcoal text-lg leading-relaxed">
              PEHNO comes from the simple Urdu word meaning &ldquo;wear.&rdquo; But to us, clothing is more than something you put on.
            </p>
            <ul className="mt-6 space-y-2 text-pehno-black text-xl font-serif font-light uppercase tracking-[0.2em]">
              <li>It is identity.</li>
              <li>It is presence.</li>
              <li>It is expression.</li>
            </ul>
            <p className="mt-6 text-pehno-charcoal text-lg leading-relaxed italic">
              PEHNO is created for those who understand that true style does not demand attention. It commands presence.
            </p>
          </div>
        </div>
      </section>

      {/* G. Luxury Campaign — The PEHNO Standard */}
      <section className="relative py-32 px-6 md:px-16 bg-pehno-green overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/pehno3.jpeg" alt="The PEHNO Standard" fill className="object-cover opacity-20" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-pehno-ivory/70 text-xs tracking-[0.4em] uppercase">Campaign</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-serif font-light text-pehno-ivory uppercase tracking-[0.15em]">
            The PEHNO Standard
          </h2>
          <p className="mt-8 text-xl text-pehno-ivory/90 italic font-light">
            Quiet in appearance. Distinct in presence.
          </p>
        </div>

        {/* Brand Philosophy Grid */}
        <div className="relative z-10 max-w-5xl mx-auto mt-20 grid md:grid-cols-3 gap-12">
          <PhilosophyCard number="01" title="Craft" description="Thoughtful materials. Precise detail." />
          <PhilosophyCard number="02" title="Identity" description="Clothing that reflects who you are." />
          <PhilosophyCard number="03" title="Presence" description="Designed to be noticed without demanding attention." />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-16 bg-pehno-offwhite relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase">Testimonials</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif font-light text-pehno-black mb-3 uppercase tracking-wide">
            What Our Customers Love
          </h2>
          <p className="text-pehno-charcoal mb-12 text-lg italic font-light">
            Real reviews from style-conscious customers who trust PEHNO
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialReviews.map((review) => (
              <Testimonial key={review.id} quote={review.comment} name={review.user_name} rating={review.rating} />
            ))}
          </div>
        </div>
      </section>

      {/* H. Join The List — Footer newsletter section */}
      <section className="relative py-24 px-6 md:px-16 bg-pehno-black text-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pehno7.jpeg"
            alt="PEHNO Collection Background"
            className="w-full h-[55vh] object-cover object-center opacity-90 select-none"
          />
          {/* Subtle dark gradient overlay to guarantee editorial legibility across all screen sizes */}
          <div className="absolute inset-0 bg-gradient-to-b from-pehno-black/90 via-pehno-black/75 to-pehno-black/95" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-pehno-ivory/60 text-xs tracking-[0.4em] uppercase font-medium">
            Private Preview
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif font-light text-pehno-ivory uppercase tracking-wide">
            Be the First to Know
          </h2>
          <p className="mt-6 text-pehno-ivory/70 text-base md:text-lg font-light leading-relaxed">
            Join the PEHNO list for first collection private previews and launch access.
          </p>

          {subscribed ? (
            <p className="mt-10 text-pehno-ivory text-lg italic font-light">
              Thank you &mdash; you&apos;re on the PEHNO list.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-10 flex items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-b border-pehno-ivory/40 text-pehno-ivory placeholder-pehno-ivory/40 px-1 py-3 text-sm focus:outline-none focus:border-pehno-ivory transition-colors duration-300"
              />
              <button
                type="submit"
                aria-label="Join"
                className="text-pehno-ivory border-b border-pehno-ivory/40 hover:border-pehno-ivory pb-3 px-1 transition-colors duration-300 text-xl"
              >
                &rarr;
              </button>
            </form>
          )}

          <div className="mt-16 pt-10 border-t border-pehno-ivory/10">
            <p className="text-3xl font-serif text-pehno-ivory uppercase tracking-[0.3em]">PEHNO</p>
            <p className="text-[10px] font-serif text-pehno-ivory/60 uppercase tracking-[0.2em] mt-1">by Sajeel Nawaz</p>
            <p className="mt-2 text-pehno-ivory/60 italic font-light">&ldquo;wear your identity&rdquo;</p>
          </div>
        </div>
      </section>

      {/* Notify Me Modal */}
      {notifyProduct && (
        <NotifyModal product={notifyProduct} onClose={() => setNotifyProduct(null)} />
      )}

      {/* Chat Button */}
      <button
        className="fixed bottom-10 right-10 bg-pehno-black text-pehno-ivory px-6 py-4 shadow-2xl hover:scale-105 transition-all duration-300 text-sm font-medium uppercase tracking-[0.15em] z-40"
        onClick={() => window.location.href = "/chat"}
      >
        Style Assistant
      </button>
    </div>
  );
}

function SignatureCard({ product, onNotify }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="group bg-pehno-ivory">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={product.image1}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${hover ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={product.image2}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 absolute inset-0 ${hover ? "opacity-100" : "opacity-0"}`}
        />

        <button
          onClick={onNotify}
          aria-label={`Notify me about ${product.name}`}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-pehno-ivory text-pehno-black flex items-center justify-center shadow-lg hover:bg-pehno-black hover:text-pehno-ivory transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="pt-4 text-left">
        <p className="text-sm md:text-base font-medium text-pehno-black">{product.name}</p>
        <p className="text-xs text-pehno-charcoal/70 uppercase tracking-[0.15em] mt-1">Coming Soon</p>
      </div>
    </div>
  );
}

function NotifyModal({ product, onClose }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-6" onClick={onClose}>
      <div
        className="bg-pehno-ivory max-w-md w-full p-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-pehno-black hover:opacity-60">
          <X className="w-5 h-5" />
        </button>

        {done ? (
          <div className="text-center py-6">
            <p className="text-lg font-serif text-pehno-black">You&apos;re on the list.</p>
            <p className="mt-2 text-sm text-pehno-charcoal">We&apos;ll let you know the moment {product.name} launches.</p>
          </div>
        ) : (
          <>
            <p className="text-xs tracking-[0.3em] uppercase text-pehno-navy">Notify Me</p>
            <h3 className="mt-2 text-2xl font-serif text-pehno-black">{product.name}</h3>
            <p className="mt-2 text-sm text-pehno-charcoal">Join the waitlist for launch access.</p>
            <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-3">
              <input
                type="email"
                required
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-b border-pehno-black/30 text-pehno-black placeholder-pehno-charcoal/50 px-1 py-2 focus:outline-none focus:border-pehno-black transition-colors duration-300"
              />
              <button type="submit" className="text-pehno-black border-b border-pehno-black/30 hover:border-pehno-black pb-2 px-1 text-lg">
                &rarr;
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function PhilosophyCard({ number, title, description }) {
  return (
    <div className="text-center px-4">
      <span className="text-sm text-pehno-ivory/50 tracking-[0.3em]">{number}</span>
      <h3 className="mt-4 text-2xl font-serif font-light text-pehno-ivory uppercase tracking-[0.2em]">{title}</h3>
      <p className="mt-4 text-pehno-ivory/70 text-lg">{description}</p>
    </div>
  );
}

function Testimonial({ quote, name, rating }) {
  const renderStars = (rating) => {
    const filled = "★".repeat(rating);
    const empty = "☆".repeat(5 - rating);
    return (
      <span className="text-pehno-charcoal/60 text-lg">
        {filled}{empty}
      </span>
    );
  };

  return (
    <div className="bg-white shadow-md p-8 text-center border border-pehno-black/10 hover:shadow-xl transition-shadow duration-500">
      <p className="text-pehno-charcoal mb-4 italic text-lg leading-relaxed">"{quote}"</p>
      <div className="mb-3">{renderStars(rating)}</div>
      <p className="font-semibold text-pehno-black text-lg uppercase tracking-wide">— {name}</p>
    </div>
  );
}