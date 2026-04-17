"use client"
import { useState } from "react";

export default function OrderItemCard({ item }) {
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  return (
    <div className="bg-white border-2 border-[#F7E7CE] rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-[#1a4d42] transition-all duration-300 flex gap-6 items-start group">
      {/* Product Image */}
      <div
        className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer relative bg-white border-2 border-[#F7E7CE] group-hover:border-[#1a4d42] transition-all"
        onMouseEnter={() => setIsHoveringImage(true)}
        onMouseLeave={() => setIsHoveringImage(false)}
      >
        <img
          src={isHoveringImage && item.image_url_2 ? item.image_url_2 : item.image_url_1}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <p className="font-semibold text-[#102C26] text-lg">{item.name}</p>
        
        <div className="mt-3 space-y-2">
          <p className="text-[#6B4F2F]">
            Quantity: <span className="font-semibold">{item.quantity}</span>
          </p>
          <p className="text-[#1a4d42] font-bold text-lg">
            Rs {Number(item.price).toFixed(2)}
          </p>
          <p className="text-[#A79277] text-sm">
            Subtotal: <span className="font-semibold text-[#1a4d42]">Rs {(Number(item.price) * item.quantity).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
