"use client"

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFoundClient() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Glowing background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1a4d42]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#102C26]/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center max-w-2xl">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-extrabold text-[#1a4d42] drop-shadow-lg">
              404
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#102C26] mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-lg text-[#6B4F2F] mb-8 leading-relaxed">
            Sorry! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Illustration */}
          <div className="mb-12 py-8">
            <div className="inline-block text-6xl">🌿</div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              Back to Home
            </Link>
            <Link
              href="/#products"
              className="border-2 border-[#1a4d42] text-[#1a4d42] px-8 py-3 rounded-xl font-semibold hover:bg-[#1a4d42] hover:text-white transition-colors duration-300"
            >
              Browse Products
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 p-6 bg-white border-2 border-[#F7E7CE] rounded-2xl">
            <p className="text-[#6B4F2F] mb-3">
              <span className="font-semibold text-[#1a4d42]">Need help?</span> Contact us at:
            </p>
            <p className="text-[#3D2817] font-semibold">
              abidamansoora016@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
