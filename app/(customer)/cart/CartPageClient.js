"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";

export default function CartPageClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const { refreshCartCount } = useCart();

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });

      if (res.status === 401) {
        setError("Please sign in to view your shopping bag.");
        setItems([]);
        return;
      }

      const data = await res.json();
      setItems(data);
    } catch (e) {
      setError("Failed to load shopping bag.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (id, quantity) => {
    if (quantity < 1) return;

    const item = items.find((i) => i.id === id);
    if (!item) return;

    if (quantity > item.available_quantity) {
      setError(`Only ${item.available_quantity} units of "${item.name}" available in stock.`);
      setTimeout(() => setError(""), 4000);
      return;
    }

    const previousItems = [...items];
    setUpdatingId(id);

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
      }
      refreshCartCount();
    } catch (err) {
      setItems(previousItems);
      setError(err.message || "Failed to update quantity.");
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (id) => {
    const previousItems = [...items];
    setUpdatingId(id);

    setItems((prev) => prev.filter((item) => item.id !== id));

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }
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
    <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black flex flex-col">
      <Navbar />

      <main className="flex-grow py-39 px-6 md:px-16 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase font-medium">
            Personal Selection
          </span>
          <h1 className="mt-2 text-3xl md:text-5xl font-serif font-light uppercase tracking-wide text-pehno-black">
            Shopping Bag
          </h1>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-white border border-pehno-black/20 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-pehno-black">
              {error}
            </p>
          </div>
        )}

        {loading ? (
          <div className="py-24 text-center">
            <span className="text-xs uppercase tracking-[0.3em] font-light text-pehno-charcoal animate-pulse">
              Retrieving bag contents...
            </span>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.length === 0 ? (
                <div className="bg-white border border-pehno-black/10 p-12 text-center">
                  <p className="text-pehno-charcoal text-base italic font-light mb-6">
                    Your shopping bag is currently empty.
                  </p>
                  <Link
                    href="/"
                    className="inline-block border border-pehno-black bg-pehno-black text-pehno-ivory px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-transparent hover:text-pehno-black transition-colors duration-300"
                  >
                    Browse Collection
                  </Link>
                </div>
              ) : (
                items.map((it) => (
                  <div
                    key={it.id}
                    className="bg-white border border-pehno-black/10 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm"
                  >
                    <div className="relative w-28 h-32 flex-shrink-0 bg-pehno-offwhite overflow-hidden border border-pehno-black/10">
                      <img
                        src={it.image_url_1}
                        alt={it.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="flex-1 w-full flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h2 className="font-serif text-lg font-light uppercase tracking-wider text-pehno-black">
                            {it.name}
                          </h2>
                          <span className="font-medium text-sm text-pehno-black">
                            Rs {Number(it.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>

                        {/* Stock Notifications */}
                        {it.quantity > it.available_quantity && (
                          <p className="text-red-900 text-xs uppercase tracking-widest mt-2 font-medium">
                            Only {it.available_quantity} available (bag contains {it.quantity})
                          </p>
                        )}

                        {it.available_quantity > 0 &&
                          it.available_quantity <= 5 &&
                          it.quantity <= it.available_quantity && (
                            <p className="text-pehno-navy text-xs uppercase tracking-widest mt-2 font-medium">
                              Limited availability: Only {it.available_quantity} remaining
                            </p>
                          )}
                      </div>

                      {/* Controls Row */}
                      <div className="mt-6 pt-4 border-t border-pehno-black/10 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-pehno-black/20">
                          <button
                            disabled={updatingId === it.id || it.quantity <= 1}
                            className="w-9 h-9 flex items-center justify-center text-xs text-pehno-black hover:bg-pehno-offwhite transition disabled:opacity-30 disabled:hover:bg-transparent"
                            onClick={() => updateQty(it.id, it.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="w-10 text-center text-xs font-semibold text-pehno-black">
                            {it.quantity}
                          </span>
                          <button
                            disabled={
                              updatingId === it.id ||
                              it.quantity >= it.available_quantity
                            }
                            className="w-9 h-9 flex items-center justify-center text-xs text-pehno-black hover:bg-pehno-offwhite transition disabled:opacity-30 disabled:hover:bg-transparent"
                            onClick={() => updateQty(it.id, it.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            &#43;
                          </button>
                        </div>

                        {/* Remove Action */}
                        <button
                          disabled={updatingId === it.id}
                          className="text-xs uppercase tracking-[0.2em] font-semibold text-pehno-charcoal hover:text-pehno-black hover:underline transition disabled:opacity-30"
                          onClick={() => removeItem(it.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary Sidebar */}
            {items.length > 0 && (
              <div className="bg-white border border-pehno-black/10 p-8 shadow-sm">
                <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-pehno-black pb-4 border-b border-pehno-black/10">
                  Summary
                </h2>

                <div className="mt-6 space-y-4 text-sm pb-6 border-b border-pehno-black/10">
                  <div className="flex justify-between items-center text-pehno-charcoal">
                    <span className="italic font-light">Subtotal</span>
                    <span className="font-medium text-pehno-black">
                      Rs {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                    Rs {(subtotal + deliveryCharges).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="mt-2 block w-full text-center border border-pehno-black bg-pehno-black text-pehno-ivory py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-transparent hover:text-pehno-black transition-colors duration-300"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}