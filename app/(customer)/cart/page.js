"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const { refreshCartCount } = useCart();

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });

      if (res.status === 401) {
        setError("Please sign in to view your cart.");
        setItems([]);
        return;
      }

      const data = await res.json();
      setItems(data);
    } catch (e) {
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ FAST quantity update (Optimistic UI)
  const updateQty = async (id, quantity) => {
    if (quantity < 1) return;
    
    // Get the item to check max quantity
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    // Check against available quantity
    if (quantity > item.available_quantity) {
      setError(`Only ${item.available_quantity} of "${item.name}" available in stock.`);
      setTimeout(() => setError(""), 4000);
      return;
    }

    const previousItems = [...items];
    setUpdatingId(id);

    // 1️⃣ Instant UI update
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
      }
      // Sync Navbar
      refreshCartCount();
    } catch (err) {
      // 2️⃣ Revert if API fails
      setItems(previousItems);
      setError(err.message || "Failed to update quantity.");
    } finally {
      setUpdatingId(null);
    }
  };

  // ✅ FAST remove
  const removeItem = async (id) => {
    const previousItems = [...items];
    setUpdatingId(id);

    // Instant remove
    setItems(prev => prev.filter(item => item.id !== id));

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }
      // Sync Navbar
      refreshCartCount();
    } catch (err) {
      setItems(previousItems);
      setError("Failed to remove item.");
    } finally {
      setUpdatingId(null);
    }
  };

  const deliveryCharges = items.length > 0 ? 200 : 0;

  const subtotal = items.reduce(
    (sum, it) => sum + Number(it.price) * it.quantity,
    0
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817] relative overflow-hidden">
        {/* Glowing background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1a4d42]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#102C26]/10 rounded-full blur-3xl"></div>

        <h1 className="relative z-10 text-4xl font-extrabold text-[#102C26] mb-8 text-center">
          Your Cart
        </h1>

        {loading ? (
          <p className="relative z-10 text-center text-[#6B4F2F] animate-pulse font-semibold">
            Loading...
          </p>
        ) : error ? (
          <p className="relative z-10 text-center text-red-600 font-semibold">{error}</p>
        ) : (
          <div className="relative z-10 mt-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Items List */}
            <div className="md:col-span-2 space-y-6">
              {items.length === 0 && (
                <p className="text-[#6B4F2F] text-center text-lg py-12">
                  Your cart is empty.
                </p>
              )}

              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 border-2 border-[#F7E7CE] rounded-2xl p-4 bg-white shadow-lg hover:shadow-2xl hover:border-[#248D76] transition-all duration-300"
                >
                  <img
                    src={it.image_url_1}
                    alt={it.name}
                    className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg border border-[#F7E7CE]"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-[#102C26] text-lg">
                      {it.name}
                    </p>

                    {it.quantity > it.available_quantity && (
                      <p className="text-red-600 text-sm font-semibold mt-1">
                        ⚠️ Only {it.available_quantity} in stock (cart has {it.quantity})
                      </p>
                    )}
                    
                    {it.available_quantity > 0 && it.available_quantity <= 5 && it.quantity <= it.available_quantity && (
                      <p className="text-orange-600 text-sm font-semibold mt-1">
                        ⚠️ Only {it.available_quantity} left in stock
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-3">

                      {/* Minus */}
                      <button
                        disabled={updatingId === it.id || it.quantity <= 1}
                        className="px-3 py-1 border-2 border-[#248D76] rounded-full bg-white text-[#248D76] hover:bg-[#248D76] hover:text-white font-semibold transition disabled:opacity-50"
                        onClick={() =>
                          updateQty(it.id, it.quantity - 1)
                        }
                      >
                        −
                      </button>

                      <span className="text-[#102C26] font-semibold min-w-[30px] text-center">
                        {it.quantity}
                      </span>

                      {/* Plus */}
                      <button
                        disabled={updatingId === it.id || it.quantity >= it.available_quantity}
                        className="px-3 py-1 border-2 border-[#248D76] rounded-full bg-white text-[#248D76] hover:bg-[#248D76] hover:text-white font-semibold transition disabled:opacity-50"
                        onClick={() =>
                          updateQty(it.id, it.quantity + 1)
                        }
                      >
                        +
                      </button>

                      {/* Remove */}
                      <button
                        disabled={updatingId === it.id}
                        className="ml-auto text-red-600 hover:text-red-700 font-semibold transition disabled:opacity-50"
                        onClick={() => removeItem(it.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            {items.length !== 0 && (
              <div className="border-2 border-[#F7E7CE] rounded-2xl p-6 bg-white shadow-lg h-fit">
                <h2 className="text-[#102C26] font-bold text-xl">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-3 border-b-2 border-[#F7E7CE] pb-4">
                  <div className="flex justify-between text-[#6B4F2F]">
                    <span>Subtotal</span>
                    <span className="font-semibold">Rs {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B4F2F]">
                    <span>Delivery Charges</span>
                    <span className="font-semibold">Rs {deliveryCharges.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-[#102C26] font-bold text-lg">Total</p>
                  <p className="text-2xl text-[#248D76] font-extrabold">
                    Rs {(subtotal + deliveryCharges).toFixed(2)}
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 inline-block w-full text-center bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
