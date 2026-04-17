"use client"
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";

const StarIcon = ({ filled = false }) => (
  <svg className={`w-5 h-5 ${filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'}`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function ProductPageClient({ initialProduct, initialReviews }) {
  const { isSignedIn } = useUser();
  const [product] = useState(initialProduct);
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleReviewAdded = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Background */}
      <div className="bg-gradient-to-br from-[#E8DCC8] to-[#DFD0B8] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-[#1a4d42] hover:text-[#0d3a33] font-medium transition-colors">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium truncate">{product.name}</span>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200 aspect-square">
                <img
                  src={selectedImage === 0 ? product.image_url_1 : (product.image_url_2 || product.image_url_1)}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 ease-out"
                />
                {/* Stock Badge */}
                <div className="absolute top-4 right-4">
                  {product.quantity > 0 ? (
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      In Stock
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Out of Stock
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.image_url_2 && (
                <div className="flex gap-3">
                  {[0, 1].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative rounded-lg overflow-hidden w-24 h-24 border-2 transition-all duration-300 ${
                        selectedImage === idx
                          ? 'border-[#1a4d42] shadow-lg ring-2 ring-[#1a4d42]/50'
                          : 'border-gray-200 hover:border-[#1a4d42]'
                      }`}
                    >
                      <img
                        src={idx === 0 ? product.image_url_1 : product.image_url_2}
                        alt={`Product view ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Product Details */}
            <div className="flex flex-col gap-8">
              {/* Header Section */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} filled={i < Math.round(avgRating)} />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{avgRating}</span>
                  <span className="text-gray-500">({reviews.length} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-[#1a4d42]">Rs {Number(product.price).toFixed(2)}</span>
                  <span className="text-lg text-gray-500">PKR</span>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Product Details</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="font-medium text-gray-900">#{product.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Availability:</span>
                  <span className={`font-bold ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              {product.quantity > 0 ? (
                <AddToCartForm productId={product.id} maxQuantity={product.quantity} />
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-4 rounded-xl font-bold text-lg cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">✓</div>
                  <p className="text-xs text-gray-600 font-medium">Verified Quality</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📦</div>
                  <p className="text-xs text-gray-600 font-medium">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🛡️</div>
                  <p className="text-xs text-gray-600 font-medium">Secure Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reviews List */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
            
            {reviews.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <p className="text-gray-600 text-lg">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIcon key={i} filled={i < review.rating} />
                            ))}
                          </div>
                          <span className="font-bold text-gray-900">{"★".repeat(review.rating)}</span>
                        </div>
                        <p className="text-sm text-gray-500">{review.user_name || "Anonymous"}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Stats & Form */}
          <div className="lg:col-span-1">
            {reviews.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-8 mb-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{avgRating}</div>
                  <div className="flex justify-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} filled={i < Math.round(avgRating)} />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {reviews.length} reviews</p>
                </div>
              </div>
            )}

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>
            <ReviewForm productId={product.id} onReviewAdded={handleReviewAdded} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useCart } from "@/lib/CartContext";

function AddToCartForm({ productId, maxQuantity }) {
  const { isSignedIn } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { refreshCartCount } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      if (typeof window !== 'undefined') {
        window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`;
      }
      return;
    }

    const qty = parseInt(quantity);
    if (qty < 1) {
      setMessage("Quantity must be at least 1");
      return;
    }
    
    if (qty > maxQuantity) {
      setMessage(`Only ${maxQuantity} item(s) available`);
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: qty })
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.error || "Failed to add to cart. Please try again.");
        return;
      }

      setMessage("✓ Added to cart!");
      setQuantity(1);
      refreshCartCount();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error adding to cart.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= maxQuantity) {
      setQuantity(e.target.value);
    } else if (value > maxQuantity) {
      setQuantity(maxQuantity.toString());
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
          <select
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4d42] focus:border-transparent"
          >
            {Array.from({ length: maxQuantity }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'item' : 'items'}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-wider"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </form>
      
      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${
          message.includes("✓") 
            ? "bg-green-50 text-green-700 border border-green-200" 
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message}
        </div>
      )}

      {maxQuantity <= 5 && maxQuantity > 0 && !message.includes("✓") && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700 font-medium">
          ⚠️ Only {maxQuantity} item(s) left in stock!
        </div>
      )}
    </div>
  );
}

function ReviewForm({ productId, onReviewAdded }) {
  const { isSignedIn, user } = useUser();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      if (typeof window !== 'undefined') {
        window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`;
      }
      return;
    }

    if (!comment.trim()) {
      setErrorMsg("Please write a comment");
      return;
    }

    if (comment.trim().length < 10) {
      setErrorMsg("Comment must be at least 10 characters");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          rating: rating,
          comment: comment
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMsg(errorData.error || "Failed to add review.");
        return;
      }

      const responseData = await res.json();

      const newReview = {
        id: responseData.id || Date.now(),
        rating: rating,
        comment: comment,
        user_name: user?.firstName || "Anonymous"
      };

      if (onReviewAdded) {
        onReviewAdded(newReview);
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg("Error submitting review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
        <p className="text-green-700 mb-4">Your review has been submitted successfully.</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setComment("");
            setRating(5);
          }}
          className="text-green-700 hover:text-green-900 font-semibold underline"
        >
          Write Another Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm font-medium flex items-start gap-3">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Rating Selection */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
          Your Rating
        </label>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-all duration-200 transform hover:scale-125"
            >
              <svg
                className={`w-10 h-10 transition-all duration-300 ${
                  star <= (hoverRating || rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-gray-300 text-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600 font-medium">
          {rating === 1 && "Poor - Needs Improvement"}
          {rating === 2 && "Fair - Below Average"}
          {rating === 3 && "Good - Meets Expectations"}
          {rating === 4 && "Very Good - Highly Satisfied"}
          {rating === 5 && "Excellent - Highly Recommended"}
        </p>
      </div>

      {/* Comment Section */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          placeholder="Share your experience with this product..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a4d42] focus:border-transparent transition-all resize-none text-base"
        />
        <p className="text-xs text-gray-500 mt-2 font-medium">
          {comment.length} characters (minimum 10 required)
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !comment.trim()}
        className="w-full bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-6 py-3 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-wider"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Submitting...
          </span>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}
