import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getOrderDetailsForCurrentUser } from "../actions";
import OrderItemCard from "@/components/OrderItemCard";
import ReviewForm from "@/components/ReviewForm";

export const dynamic = 'force-dynamic';

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

  // Error view if order is null or access is denied
  if (!order) {
    const isUnauthorized = errorType === "Unauthorized" || errorType === "User not found in DB";

    return (
      <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black">
        <Navbar />

        <main className="py-39 px-6 md:px-16 max-w-4xl mx-auto">
          <div className="text-center py-16 bg-white border border-pehno-black/10 p-8 md:p-12">
            <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase">
              {isUnauthorized ? "Authentication Error" : "System Message"}
            </span>

            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-light uppercase tracking-wide text-pehno-black">
              {isUnauthorized ? "Access Denied" : "Order Not Found"}
            </h1>

            <p className="mt-6 text-pehno-charcoal text-base md:text-lg italic font-light max-w-xl mx-auto leading-relaxed">
              {isUnauthorized
                ? "You do not have permission to view this order. Please sign in with the associated account."
                : "The order you are looking for does not exist or has been removed from our system."}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/orders"
                className="w-full sm:w-auto border border-pehno-black bg-pehno-black text-pehno-ivory px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-transparent hover:text-pehno-black transition-colors duration-300"
              >
                &larr; Back to My Orders
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto border border-pehno-black text-pehno-black px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-pehno-black hover:text-pehno-ivory transition-colors duration-300"
              >
                Return to Home
              </Link>
            </div>

            <div className="mt-16 pt-8 border-t border-pehno-black/10 text-left md:text-center">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-pehno-black mb-2">Need Assistance?</p>
              <p className="text-sm text-pehno-charcoal italic font-light mb-4">
                Our support team is available to help resolve any issues with your account or orders.
              </p>
              <a
                href="mailto:pehnobysajeelnawaz@gmail.com"
                className="text-xs uppercase tracking-[0.2em] text-pehno-navy font-semibold hover:underline"
              >
                Contact Support &rarr;
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const deliveryCharge = 200;
  const totalPrice = Number(order.total_price);
  const subtotal = totalPrice - deliveryCharge;

  return (
    <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black">
      <Navbar />

      <main className="py-24 px-6 md:px-16 max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="mb-10">
          <Link
            href="/orders"
            className="inline-block text-xs font-semibold text-pehno-charcoal uppercase tracking-[0.2em] hover:text-pehno-black transition-colors"
          >
            &larr; Return to Orders
          </Link>
        </div>

        {/* Order Header */}
        <div className="border-b border-pehno-black/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase">Order Overview</span>
            <h1 className="mt-2 text-3xl md:text-5xl font-serif font-light uppercase tracking-wide text-pehno-black">
              Order #{order.id}
            </h1>
            <p className="mt-3 text-pehno-charcoal italic font-light text-sm md:text-base">
              Placed on{" "}
              <span className="not-italic font-medium text-pehno-black">
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>

          <div>
            <span
              className={`inline-block px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium border ${
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

        {/* Items List */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between border-b border-pehno-black/10 pb-4">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-pehno-black">
              Selected Items ({order.items.length})
            </h2>
          </div>

          <div className="space-y-4">
            {order.items.map((it, index) => (
              <OrderItemCard key={`${it.product_id}-${index}`} item={it} />
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white border border-pehno-black/10 p-8 md:p-10 mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-pehno-black mb-6 pb-4 border-b border-pehno-black/10">
            Payment Breakdown
          </h2>

          <div className="space-y-3 text-sm md:text-base">
            <div className="flex justify-between items-center text-pehno-charcoal">
              <span className="italic font-light">Subtotal</span>
              <span className="font-medium text-pehno-black">
                Rs {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center text-pehno-charcoal">
              <span className="italic font-light">Standard Delivery</span>
              <span className="font-medium text-pehno-black">
                Rs {deliveryCharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="pt-6 border-t border-pehno-black/10 flex justify-between items-center text-pehno-black">
              <span className="text-lg font-serif font-light uppercase tracking-wider">Total</span>
              <span className="text-xl font-semibold">
                Rs {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Review Form (Conditional) */}
        {order.status === "delivered" && (
          <div className="bg-pehno-ivory border border-pehno-black/10 p-8 md:p-10">
            <ReviewForm orderId={order.id} />
          </div>
        )}
      </main>
    </div>
  );
}