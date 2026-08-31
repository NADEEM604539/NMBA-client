"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateSort, setDateSort] = useState("desc"); // 'asc' or 'desc'

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/orders");
        if (!res.ok) {
          setError("Failed to load orders");
          setOrders([]);
          return;
        }
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError("Please sign in to view your orders.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => statusFilter === "all" || order.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateSort === "desc" ? dateB - dateA : dateA - dateB;
    });

  // Status options from database ENUM
  const statusOptions = ["pending", "processing", "delivered", "cancelled"];

  return (
    <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black">
      <Navbar />
      
      <main className="py-39 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <Link 
            href="/" 
            className="inline-block mb-10 text-xs font-semibold text-pehno-charcoal uppercase tracking-[0.2em] hover:text-pehno-black transition-colors"
          >
            &larr; Return to Home
          </Link>
          
          <div>
            <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase">Account</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-serif font-light text-pehno-black uppercase tracking-wide">
              My Orders
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-pehno-charcoal text-lg italic font-light tracking-wide animate-pulse">
              Retrieving your collection...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 border border-dashed border-pehno-black/20 max-w-4xl mx-auto">
            <p className="text-pehno-charcoal text-lg font-light">{error}</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            
            {/* Filters Section */}
            <div className="mb-12 py-6 border-y border-pehno-black/10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
              
              {/* Status Filter */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <label className="text-xs font-semibold text-pehno-charcoal uppercase tracking-[0.2em] whitespace-nowrap">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full md:w-48 bg-transparent border-b border-pehno-black/30 text-pehno-black focus:outline-none focus:border-pehno-black py-2 uppercase text-sm tracking-wider transition-colors cursor-pointer"
                >
                  <option value="all">All</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Sort */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <label className="text-xs font-semibold text-pehno-charcoal uppercase tracking-[0.2em] whitespace-nowrap">
                  Sort
                </label>
                <select
                  value={dateSort}
                  onChange={(e) => setDateSort(e.target.value)}
                  className="w-full md:w-48 bg-transparent border-b border-pehno-black/30 text-pehno-black focus:outline-none focus:border-pehno-black py-2 uppercase text-sm tracking-wider transition-colors cursor-pointer"
                >
                  <option value="desc">Newest</option>
                  <option value="asc">Oldest</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-20 bg-white border border-pehno-black/10">
                  <p className="text-pehno-charcoal text-lg font-light italic">
                    {orders.length === 0 
                      ? "Your order history is currently empty." 
                      : "No orders match your current filters."}
                  </p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="block group bg-white border border-pehno-black/10 p-8 shadow-sm hover:shadow-xl hover:border-pehno-black/30 transition-all duration-500"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      
                      {/* Order Info */}
                      <div>
                        <h3 className="text-2xl font-serif font-light text-pehno-black tracking-wide group-hover:text-pehno-navy transition-colors">
                          Order #{order.id}
                        </h3>
                        <p className="text-pehno-charcoal mt-2 italic font-light">
                          Placed on{" "}
                          <span className="not-italic font-medium text-pehno-black">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </p>
                      </div>

                      {/* Status & Price */}
                      <div className="text-left md:text-right flex flex-col md:items-end justify-center">
                        <p className="font-sans font-semibold text-pehno-black text-xl tracking-wide">
                          Rs {Number(order.total_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        
                        <div className="mt-4">
                          <span
                            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium border ${
                              order.status === "delivered"
                                ? "border-pehno-black text-pehno-black"
                                : order.status === "processing"
                                ? "border-pehno-navy text-pehno-navy"
                                : order.status === "pending"
                                ? "border-pehno-charcoal text-pehno-charcoal"
                                : order.status === "cancelled"
                                ? "border-red-900/40 text-red-900"
                                : "border-pehno-black/20 text-pehno-charcoal"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Results count */}
            <div className="text-center mt-12 pt-8 border-t border-pehno-black/10">
              <p className="text-pehno-charcoal text-xs uppercase tracking-[0.2em]">
                Showing {filteredOrders.length} of {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}