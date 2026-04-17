"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";


export default function CheckoutPage() {
  const [items, setItems] = useState([]);
  const [placing, setPlacing] = useState(false);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const { refreshCartCount } = useCart();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/cart", { cache: "no-store" });
      if (res.status === 401) {
        setError("Please sign in to checkout.");
        setItems([]);
        return;
      }
      setItems(await res.json());
    })();
  }, []);

  const total = items.reduce(
    (s, it) => (s + Number(it.price) * it.quantity),
    0
  );

  const placeOrder = async () => {
    setPlacing(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact,
        address,
        payment_method: paymentMethod,
      }),
    });
    setPlacing(false);
    setShowConfirm(false); // Close modal
    if (res.ok) {
      await res.json();
      // Sync Navbar (Cart is cleared after order)
      refreshCartCount();
      window.location.href = "/orders";
    } else {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "Failed to place order");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen px-6 md:px-16 py-12 relative overflow-hidden bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817]">
        {/* Glowing background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1a4d42]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#102C26]/10 rounded-full blur-3xl"></div>

        {/* Page Heading */}
        <h1 className="relative z-10 text-5xl font-extrabold text-[#102C26] mb-12 text-center tracking-wide">
          Checkout
        </h1>

        <div className="relative z-10 mt-6 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Items & Form */}
          <div className="md:col-span-2 space-y-6">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex items-center gap-4 bg-white border-2 border-[#F7E7CE] rounded-2xl p-5 shadow-lg hover:shadow-xl hover:border-[#248D76] transition-all duration-300"
              >
                <img
                  src={it.image_url_1}
                  alt={it.name}
                  className="w-24 h-24 object-cover rounded-lg border border-[#F7E7CE]"
                />
                <div className="flex-1">
                  <p className="font-semibold text-[#102C26] text-lg">
                    {it.name}
                  </p>
                  <p className="text-[#6B4F2F] mt-1">Qty: {it.quantity}</p>
                </div>
                <div className="text-[#248D76] font-bold text-lg">
                  Rs {(Number(it.price) * it.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {/* Customer Details */}
            <div className="grid gap-4 mt-8 bg-white border-2 border-[#F7E7CE] rounded-2xl p-6 shadow-lg">
              <label className="text-[#102C26] font-semibold text-lg">
                Phone
              </label>
              <input
                suppressHydrationWarning
                value={contact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 12) {
                    setContact(value);
                  }
                }}
                type="number"
                placeholder="Enter phone number"
                className="px-5 py-3 rounded-lg border-2 border-[#F7E7CE] bg-white text-[#3D2817] focus:outline-none focus:border-[#248D76] transition-colors shadow-sm placeholder-[#A79277]"
              />
              <label className="text-[#102C26] font-semibold text-lg">
                Address
              </label>
              <textarea
                suppressHydrationWarning
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                placeholder="Delivery address"
                className="px-5 py-3 rounded-lg border-2 border-[#F7E7CE] bg-white text-[#3D2817] focus:outline-none focus:border-[#248D76] transition-colors shadow-sm placeholder-[#A79277]"
              />

              <label className="text-[#102C26] font-semibold text-lg">
                Payment Method
              </label>
              <select
                suppressHydrationWarning
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="px-5 py-3 rounded-lg border-2 border-[#F7E7CE] bg-white text-[#3D2817] focus:outline-none focus:border-[#248D76] transition-colors shadow-sm font-medium"
              >
                <option value="cod">Cash on Delivery</option>
              </select>

              {error && <p className="text-red-600 font-semibold">{error}</p>}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-2 border-[#F7E7CE] rounded-2xl p-8 bg-white shadow-xl flex flex-col gap-6 h-fit">
            <h2 className="text-[#102C26] font-bold text-xl">Order Summary</h2>
            
            <div className="space-y-3 pb-6 border-b-2 border-[#F7E7CE]">
              <div className="flex justify-between text-[#6B4F2F]">
                <span>Subtotal</span>
                <span className="font-semibold">Rs {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6B4F2F]">
                <span>Delivery Charges</span>
                <span className="font-semibold">Rs 200</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-[#102C26] font-bold text-lg">Total</p>
              <p className="text-2xl text-[#248D76] font-extrabold">
                Rs {(total + 200).toFixed(2)}
              </p>
            </div>

            <button
              disabled={placing || !contact || !address || items.length === 0}
              onClick={() => setShowConfirm(true)}
              className="w-full bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 disabled:opacity-60"
            >
              {placing ? "Placing..." : "Place Order"}
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
                <div className="bg-white border-2 border-[#F7E7CE] rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                  <h2 className="text-2xl font-bold text-[#102C26] mb-4">Confirm Your Order</h2>
                  <p className="text-[#6B4F2F] mb-6 leading-relaxed">
                    Are you sure you want to place this order? Please double-check your phone number and delivery address.
                  </p>
                  <div className="space-y-3 text-sm text-[#3D2817] mb-8 p-4 bg-[#FFF2E1] rounded-lg border border-[#F7E7CE]">
                    <p><span className="text-[#248D76] font-semibold">Phone:</span> {contact}</p>
                    <p><span className="text-[#248D76] font-semibold">Address:</span> {address}</p>
                    <p><span className="text-[#248D76] font-semibold">Total:</span> Rs {(total + 200).toFixed(2)}</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 px-6 py-3 rounded-lg border-2 border-[#F7E7CE] text-[#248D76] font-semibold hover:bg-[#FFF2E1] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={placeOrder}
                      disabled={placing}
                      className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      {placing ? "Confirming..." : "Confirm Order"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Link
              href="/cart"
              className="mt-2 block text-center text-[#248D76] hover:text-[#1A6B5F] font-semibold transition-colors"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
