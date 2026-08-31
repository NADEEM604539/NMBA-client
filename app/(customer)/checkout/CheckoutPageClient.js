"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";

export default function CheckoutPageClient() {
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
        setError("Please sign in to proceed with checkout.");
        setItems([]);
        return;
      }
      setItems(await res.json());
    })();
  }, []);

  const total = items.reduce(
    (s, it) => s + Number(it.price) * it.quantity,
    0
  );

  const deliveryCharges = items.length > 0 ? 200 : 0;

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
    setShowConfirm(false);
    if (res.ok) {
      await res.json();
      refreshCartCount();
      window.location.href = "/orders";
    } else {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "Failed to place order");
    }
  };

  return (
    <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black flex flex-col">
      <Navbar />

      <main className="flex-grow py-39 px-6 md:px-16 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase font-medium">
            Order Processing
          </span>
          <h1 className="mt-2 text-3xl md:text-5xl font-serif font-light uppercase tracking-wide text-pehno-black">
            Checkout
          </h1>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-white border border-pehno-black/20 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-pehno-black">
              {error}
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Main Details Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Selected Items Breakdown */}
            <div className="bg-white border border-pehno-black/10 p-6 md:p-8">
              <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-pehno-black pb-4 border-b border-pehno-black/10 mb-6">
                Selection Details
              </h2>

              <div className="space-y-4">
                {items.length === 0 ? (
                  <p className="text-pehno-charcoal text-sm italic font-light">
                    No items selected for checkout.
                  </p>
                ) : (
                  items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center gap-6 py-3 border-b border-pehno-black/5 last:border-b-0"
                    >
                      <div className="w-16 h-20 bg-pehno-offwhite flex-shrink-0 border border-pehno-black/10 overflow-hidden">
                        <img
                          src={it.image_url_1}
                          alt={it.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-base font-light uppercase tracking-wider text-pehno-black">
                          {it.name}
                        </p>
                        <p className="text-xs text-pehno-charcoal italic font-light mt-1">
                          Quantity: {it.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-pehno-black">
                        Rs {(Number(it.price) * it.quantity).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Customer Contact & Delivery Form */}
            <div className="bg-white border border-pehno-black/10 p-6 md:p-8 space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-pehno-black pb-4 border-b border-pehno-black/10">
                Delivery Information
              </h2>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-pehno-black">
                  Contact Phone
                </label>
                <input
                  suppressHydrationWarning
                  value={contact}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 12) setContact(value);
                  }}
                  type="number"
                  placeholder="e.g. 03001234567"
                  className="w-full px-4 py-3 bg-pehno-offwhite border border-pehno-black/20 text-sm text-pehno-black focus:outline-none focus:border-pehno-black placeholder:text-pehno-charcoal/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-pehno-black">
                  Shipping Address
                </label>
                <textarea
                  suppressHydrationWarning
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Complete residential or delivery location details"
                  className="w-full px-4 py-3 bg-pehno-offwhite border border-pehno-black/20 text-sm text-pehno-black focus:outline-none focus:border-pehno-black placeholder:text-pehno-charcoal/50 transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-pehno-black">
                  Payment Method
                </label>
                <select
                  suppressHydrationWarning
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 bg-pehno-offwhite border border-pehno-black/20 text-sm text-pehno-black focus:outline-none focus:border-pehno-black transition-colors"
                >
                  <option value="cod">Cash on Delivery (COD)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white border border-pehno-black/10 p-8 shadow-sm">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-pehno-black pb-4 border-b border-pehno-black/10">
              Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm pb-6 border-b border-pehno-black/10">
              <div className="flex justify-between items-center text-pehno-charcoal">
                <span className="italic font-light">Subtotal</span>
                <span className="font-medium text-pehno-black">
                  Rs {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-pehno-charcoal">
                <span className="italic font-light">Standard Delivery</span>
                <span className="font-medium text-pehno-black">
                  Rs {deliveryCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="py-6 flex justify-between items-center text-pehno-black">
              <span className="text-base font-serif font-light uppercase tracking-wider">
                Total
              </span>
              <span className="text-xl font-semibold">
                Rs {(total + deliveryCharges).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <button
              disabled={placing || !contact || !address || items.length === 0}
              onClick={() => setShowConfirm(true)}
              className="w-full border border-pehno-black bg-pehno-black text-pehno-ivory py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-transparent hover:text-pehno-black transition-colors duration-300 disabled:opacity-40 disabled:hover:bg-pehno-black disabled:hover:text-pehno-ivory"
            >
              {placing ? "Processing..." : "Place Order"}
            </button>

            <div className="mt-6 text-center">
              <Link
                href="/cart"
                className="text-xs uppercase tracking-[0.2em] font-semibold text-pehno-charcoal hover:text-pehno-black hover:underline transition-colors"
              >
                &larr; Return to Shopping Bag
              </Link>
            </div>
          </div>
        </div>

        {/* Modal Window */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-pehno-black/60 backdrop-blur-sm p-6">
            <div className="bg-white border border-pehno-black/10 p-8 max-w-md w-full shadow-2xl">
              <span className="text-pehno-navy text-xs tracking-[0.3em] uppercase font-medium">
                Verification
              </span>
              <h3 className="mt-1 text-2xl font-serif font-light uppercase tracking-wide text-pehno-black mb-4">
                Confirm Order
              </h3>
              
              <p className="text-pehno-charcoal text-xs italic font-light leading-relaxed mb-6">
                Please verify your dispatch details before finalizing your acquisition.
              </p>

              <div className="space-y-3 text-xs text-pehno-black mb-8 p-4 bg-pehno-offwhite border border-pehno-black/10">
                <p>
                  <span className="uppercase tracking-wider font-semibold text-pehno-navy">Contact:</span> {contact}
                </p>
                <p>
                  <span className="uppercase tracking-wider font-semibold text-pehno-navy">Address:</span> {address}
                </p>
                <p>
                  <span className="uppercase tracking-wider font-semibold text-pehno-navy">Total Payable:</span> Rs {(total + deliveryCharges).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 border border-pehno-black/30 py-3 text-xs font-medium uppercase tracking-[0.2em] text-pehno-black hover:bg-pehno-offwhite transition-colors"
                >
                  Edit Details
                </button>
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="flex-1 border border-pehno-black bg-pehno-black text-pehno-ivory py-3 text-xs font-medium uppercase tracking-[0.2em] hover:bg-transparent hover:text-pehno-black transition-colors disabled:opacity-50"
                >
                  {placing ? "Confirming..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}