"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, isDeal = false }) {
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  return (
    <div className="group relative">
      {/* Subtle background gradient */}
      {!isDeal && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#A79277]/5 to-[#6B4F2F]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Glow effect for deals */}
      {isDeal && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#A79277]/20 to-[#6B4F2F]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      )}

      <div className={`relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border h-full flex flex-col ${
        isDeal 
          ? "bg-gradient-to-br from-[#FFE8C8] via-[#FFF2E1] to-[#F5E6D3] shadow-2xl hover:shadow-3xl border-3 border-[#A79277]"
          : "bg-gradient-to-br from-white via-[#FDF9F3] to-[#F5E6D3] border-[#D9CDB5] hover:border-[#A79277]"
      }`}>

        {/* Corner accent for regular products */}
        {!isDeal && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#A79277]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* Deal Badge */}
        {isDeal && (
          <div className="absolute top-3 left-6 right-6 bg-gradient-to-r from-[#A79277] to-[#6B4F2F] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-20 text-center">
            🎁 SPECIAL DEAL
          </div>
        )}

        <Link href={`/products/${product.id}`} className={`relative z-10 block h-full flex flex-col ${isDeal ? "pt-10" : ""}`}>
          {/* Product Image with Hover Effect */}
          <div 
            className={`aspect-square w-full overflow-hidden rounded-2xl relative mb-5 ${
              isDeal 
                ? "bg-gradient-to-br from-[#F5E6D3] to-[#E8DCC8] ring-2 ring-[#A79277]/40"
                : "bg-gradient-to-br from-[#F5E6D3] to-[#E8DCC8] border border-[#D9CDB5]"
            }`}
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
          >
            <Image
              src={isHoveringImage && product.image_url_2 ? product.image_url_2 : product.image_url_1}
              alt={`${product.name} - Pure Organic Herbal Oil`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-all duration-500"
              unoptimized
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
          </div>

          {/* Product Details */}
          <h3 className="text-xl font-bold text-[#102C26] group-hover:text-[#1A4A42] hover:underline transition-colors duration-300 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Status Badge */}
          <div className="mb-4">
            {product.quantity > 0 ? (
              <div className="inline-flex items-center gap-2 bg-[#D1FAE5] px-3 py-1.5 rounded-full border-2 border-[#102C26]">
                <span className="inline-block w-2 h-2 bg-[#102C26] rounded-full animate-pulse" />
                <span className="text-[#102C26] text-xs font-bold">IN STOCK</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-red-100 px-3 py-1.5 rounded-full border border-red-400">
                <span className="inline-block w-2 h-2 bg-red-600 rounded-full" />
                <span className="text-red-700 text-xs font-bold">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-[#248D76] mb-3 group-hover:text-[#1A6B5F] transition-colors">
            Rs {Number(product.price).toFixed(2)}
          </p>

          {/* Description */}
          <p className="text-[#3D2817] text-sm leading-relaxed line-clamp-2 group-hover:text-[#1A1410] transition-colors flex-grow">
            {product.description}
          </p>
        </Link>
      </div>
    </div>
  );
}
