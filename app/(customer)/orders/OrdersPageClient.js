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
    <div>
      <Navbar />
      <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817] relative overflow-hidden">
        {/* Glowing background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#248D76]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#102C26]/10 rounded-full blur-3xl"></div>

        <Link href="/" className="relative z-10 text-[#248D76] hover:text-[#1A6B5F] font-semibold transition-colors">
          ← Back to Home
        </Link>

        <h1 className="relative z-10 text-4xl font-extrabold text-[#102C26] mt-6 mb-8">
          My Orders
        </h1>

        {loading ? (
          <div className="relative z-10 text-center">
            <p className="text-[#6B4F2F]">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="relative z-10 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : (
          <>
            {/* Filters Section */}
            <div className="relative z-10 max-w-4xl mx-auto mb-8 bg-white border-2 border-[#F7E7CE] rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="text-sm font-semibold text-[#102C26] block mb-2">
                    Filter by Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border-2 border-[#F7E7CE] rounded-lg px-4 py-2 bg-white text-[#3D2817] focus:outline-none focus:border-[#248D76] transition-colors font-medium"
                  >
                    <option value="all">All Statuses</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Sort */}
                <div>
                  <label className="text-sm font-semibold text-[#102C26] block mb-2">
                    Sort by Date
                  </label>
                  <select
                    value={dateSort}
                    onChange={(e) => setDateSort(e.target.value)}
                    className="w-full border-2 border-[#F7E7CE] rounded-lg px-4 py-2 bg-white text-[#3D2817] focus:outline-none focus:border-[#248D76] transition-colors font-medium"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="relative z-10 space-y-5 max-w-4xl mx-auto">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white border-2 border-[#F7E7CE] rounded-2xl">
                  <p className="text-[#6B4F2F] text-lg">
                    {orders.length === 0 ? "You have no orders yet." : "No orders match your filters."}
                  </p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="block bg-white border-2 border-[#F7E7CE] rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-[#248D76] transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-[#102C26] text-lg">
                          Order #{order.id}
                        </p>
                        <p className="text-[#6B4F2F] text-sm mt-2">
                          Placed on:{" "}
                          <span className="font-semibold">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </p>
                        <p className="text-[#6B4F2F] text-sm mt-1">
                          Status:{" "}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold inline-block mt-1 ${
                              order.status === "delivered"
                                ? "bg-[#248D76]/20 text-[#248D76]"
                                : order.status === "processing"
                                ? "bg-blue-500/20 text-blue-600"
                                : order.status === "pending"
                                ? "bg-[#F7A500]/20 text-[#C67F1F]"
                                : order.status === "cancelled"
                                ? "bg-red-500/20 text-red-600"
                                : "bg-gray-500/20 text-gray-600"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-[#248D76] text-xl">
                          Rs {Number(order.total_price).toFixed(2)}
                        </p>
                        <p className="text-[#A79277] text-xs mt-2">Click to view details</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Results count */}
            <div className="relative z-10 text-center mt-8">
              <p className="text-[#6B4F2F] text-sm">
                Showing {filteredOrders.length} of {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
