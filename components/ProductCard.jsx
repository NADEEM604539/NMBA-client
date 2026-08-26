"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, isDeal = false }) {
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  return (
    <div className="group relative bg-pehno-ivory border border-pehno-black/10 hover:border-pehno-black/30 transition-colors duration-300 h-full flex flex-col">

      {/* Deal Badge */}
      {isDeal && (
        <div className="absolute top-3 left-3 right-3 bg-pehno-black text-pehno-ivory px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] z-20 text-center">
          Special Deal
        </div>
      )}

      <Link href={`/products/${product.id}`} className={`relative z-10 block h-full flex flex-col ${isDeal ? "pt-9" : ""}`}>
        {/* Product Image with Hover Effect */}
        <div
          className="aspect-square w-full overflow-hidden relative bg-pehno-offwhite"
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
        >
          <Image
            src={isHoveringImage && product.image_url_2 ? product.image_url_2 : product.image_url_1}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-opacity duration-500"
            unoptimized
          />
        </div>

        {/* Product Details */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-base font-medium text-pehno-black group-hover:underline transition-colors duration-300 mb-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <p className="text-lg font-serif text-pehno-black mb-2">
            Rs {Number(product.price).toFixed(2)}
          </p>

          {/* Status */}
          <p className={`text-xs uppercase tracking-[0.15em] mb-3 ${product.quantity > 0 ? "text-pehno-green" : "text-red-700"}`}>
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Description */}
          <p className="text-pehno-charcoal text-sm leading-relaxed line-clamp-2 flex-grow">
            {product.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
