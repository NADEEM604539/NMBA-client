"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFoundClient() {
  return (
    <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-6 md:px-16">
        <div className="max-w-2xl w-full mx-auto text-center">
          
          {/* Subtle Tag */}
          <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase font-medium">
            404 &mdash; Error
          </span>

          {/* Large Editorial 404 Heading */}
          <h1 className="mt-4 text-7xl md:text-9xl font-serif font-light uppercase tracking-wider text-pehno-black">
            404
          </h1>

          <h2 className="mt-2 text-xl md:text-3xl font-serif font-light uppercase tracking-[0.2em] text-pehno-black">
            Page Not Found
          </h2>

          {/* Subtext */}
          <p className="mt-6 text-pehno-charcoal text-sm md:text-base italic font-light max-w-md mx-auto leading-relaxed">
            The destination you are seeking does not exist or may have been relocated within our house archives.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="w-full sm:w-auto border border-pehno-black bg-pehno-black text-pehno-ivory px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-transparent hover:text-pehno-black transition-colors duration-300"
            >
              Return to Home
            </Link>
            <Link
              href="/#products"
              className="w-full sm:w-auto border border-pehno-black text-pehno-black px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-pehno-black hover:text-pehno-ivory transition-colors duration-300"
            >
              Browse Collection
            </Link>
          </div>

          {/* Luxury Support Section */}
          <div className="mt-16 pt-8 border-t border-pehno-black/10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-pehno-black mb-2">
              Client Assistance
            </p>
            <p className="text-xs text-pehno-charcoal italic font-light mb-3">
              Should you require further navigation support, please contact our team.
            </p>
            <a
              href="mailto:pehnobysajeelnawaz@gmail.com"
              className="text-xs uppercase tracking-[0.2em] text-pehno-navy font-semibold hover:underline"
            >
              pehnobysajeelnawaz@gmail.com
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}