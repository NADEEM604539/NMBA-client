import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getOrderDetailsForCurrentUser } from "../actions";
import OrderItemCard from "@/components/OrderItemCard";
import ReviewForm from "@/components/ReviewForm";

export default async function OrderDetails({ params }) {
  let order;
  let errorType = null;
  try {
    const { id } = await params;
    order = await getOrderDetailsForCurrentUser(id);
  } catch (e) {
    order = null;
    errorType = e.message;
  }

  if (!order) {
    const isUnauthorized = errorType === "Unauthorized" || errorType === "User not found in DB";
    const isNotFound = errorType === "Not found";

    return (
      <div>
        <Navbar />
        <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817] relative overflow-hidden">
          {/* Glowing background orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#248D76]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#102C26]/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center py-20">
            {/* Error Icon */}
            <div className="mb-8">
              <div className={`inline-block w-24 h-24 ${isUnauthorized ? 'bg-red-500/20' : 'bg-orange-500/20'} rounded-full flex items-center justify-center mb-6`}>
                <span className="text-6xl">{isUnauthorized ? '🔒' : '❓'}</span>
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-5xl font-extrabold text-[#102C26] mb-4">
              {isUnauthorized ? 'Access Denied' : 'Order Not Found'}
            </h1>

            {/* Error Message */}
            <p className="text-xl text-[#6B4F2F] mb-8 leading-relaxed">
              {isUnauthorized 
                ? "You don't have permission to access this order. This order belongs to another user or your session has expired."
                : "Sorry, the order you're looking for doesn't exist or has been removed from our system."}
            </p>

            {/* Additional Info */}
            <p className="text-[#A79277] mb-12">
              {isUnauthorized 
                ? "For security reasons, you can only view your own orders."
                : "It might have been cancelled or the link might be incorrect."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/orders"
                className="inline-block bg-[#248D76] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1A6B5F] transition-colors shadow-lg hover:shadow-xl"
              >
                ← Back to My Orders
              </Link>
              <Link
                href="/"
                className="inline-block bg-white border-2 border-[#248D76] text-[#248D76] px-8 py-4 rounded-xl font-semibold hover:bg-[#248D76] hover:text-white transition-all shadow-lg hover:shadow-xl"
              >
                Go to Home
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-16 p-8 bg-white border-2 border-[#F7E7CE] rounded-2xl shadow-lg">
              <p className="text-[#102C26] font-semibold mb-3">Need Help?</p>
              <p className="text-[#6B4F2F] mb-4">
                {isUnauthorized 
                  ? "If you believe this is a mistake, please try signing in again or contact our support team."
                  : "If you think this is an error, please contact our support team."}
              </p>
              <a
                href="mailto:abidamansoora016@gmail.com"
                className="text-[#248D76] hover:text-[#1A6B5F] font-semibold transition-colors"
              >
                📧 Get Support
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817] relative overflow-hidden">
      <Navbar />
      
      {/* Glowing background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#248D76]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#102C26]/10 rounded-full blur-3xl"></div>

      <div className="relative px-6 md:px-16 py-12 max-w-5xl mx-auto z-10">
        {/* Back link */}
        <Link href="/orders" className="text-[#248D76] hover:text-[#1A6B5F] font-semibold transition-colors">
          ← Back to orders
        </Link>

        <div className="mt-6 space-y-3">
          <h1 className="text-4xl font-extrabold text-[#102C26]">
            Order #{order.id}
          </h1>
          <p className="text-[#6B4F2F]">
            {new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })} •{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
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

        {/* Items List */}
        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold text-[#102C26]">Order Items</h2>
          {order.items.map((it, index) => (
            <OrderItemCard key={it.product_id - index} item={it} />
          ))}
        </div>

        {/* Total Section */}
        <div className="mt-10 bg-white border-2 border-[#F7E7CE] rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[#6B4F2F] mb-2">Subtotal</p>
              <p className="text-[#6B4F2F]">Delivery Charges</p>
            </div>
            <div className="text-right">
              <p className="text-[#3D2817] font-semibold mb-2">
                Rs {(Number(order.total_price) - 200).toFixed(2)}
              </p>
              <p className="text-[#3D2817] font-semibold">Rs 200</p>
            </div>
          </div>
          <div className="border-t-2 border-[#F7E7CE] mt-4 pt-4 flex justify-between items-center">
            <p className="text-2xl font-bold text-[#102C26]">Total:</p>
            <p className="text-2xl font-bold text-[#248D76]">
              Rs {Number(order.total_price).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Review Form only if delivered */}
        {order.status === "delivered" && <ReviewForm orderId={order.id} />}
      </div>
    </div>
  );
}
