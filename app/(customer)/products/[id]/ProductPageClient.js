"use client"
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";

const StarIcon = ({ filled = false }) => (
  <svg className={`w-4 h-4 ${filled ? 'fill-pehno-black text-pehno-black' : 'fill-pehno-black/15 text-pehno-black/15'}`} viewBox="0 0 20 20">
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
    <div className="bg-pehno-offwhite min-h-screen">
      {/* Hero Background */}
      <div className="bg-pehno-black pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] mb-10">
            <Link href="/products" className="text-pehno-ivory/60 hover:text-pehno-ivory transition-colors">
              Collections
            </Link>
            <span className="text-pehno-ivory/30">/</span>
            <span className="text-pehno-ivory/80 truncate">{product.name}</span>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative overflow-hidden bg-pehno-ivory aspect-square">
                <img
                  src={selectedImage === 0 ? product.image_url_1 : (product.image_url_2 || product.image_url_1)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Stock Badge */}
                <div className="absolute top-4 right-4">
                  {product.quantity > 0 ? (
                    <div className="bg-pehno-ivory text-pehno-black px-4 py-2 text-xs font-medium uppercase tracking-[0.15em]">
                      In Stock
                    </div>
                  ) : (
                    <div className="bg-pehno-black text-pehno-ivory px-4 py-2 text-xs font-medium uppercase tracking-[0.15em]">
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
                      className={`relative overflow-hidden w-24 h-24 border transition-all duration-300 ${
                        selectedImage === idx
                          ? 'border-pehno-ivory'
                          : 'border-pehno-ivory/20 hover:border-pehno-ivory/60'
                      }`}
                    >
                      <img
                        src={idx === 0 ? product.image_url_1 : product.image_url_2}
                        alt={`Product view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Product Details */}
            <div className="flex flex-col gap-8 text-pehno-ivory">
              {/* Header Section */}
              <div>
                <span className="text-pehno-ivory/50 text-xs tracking-[0.4em] uppercase">PEHNO</span>
                <h1 className="mt-3 text-4xl md:text-5xl font-serif font-light leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIconLight key={i} filled={i < Math.round(avgRating)} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-pehno-ivory">{avgRating}</span>
                  <span className="text-pehno-ivory/50 text-sm">({reviews.length} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-6">
                  <span className="text-3xl font-serif text-pehno-ivory">Rs {Number(product.price).toFixed(2)}</span>
                  <span className="text-sm text-pehno-ivory/50 uppercase tracking-widest">PKR</span>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-pehno-ivory/15 pt-6">
                <p className="text-pehno-ivory/70 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="border border-pehno-ivory/15 p-6 space-y-3">
                <h3 className="text-xs font-semibold text-pehno-ivory/60 uppercase tracking-[0.2em] mb-2">Product Details</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-pehno-ivory/50">Product ID</span>
                  <span className="font-medium text-pehno-ivory">#{product.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-pehno-ivory/50">Availability</span>
                  <span className="font-medium text-pehno-ivory">
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
                  className="w-full bg-pehno-ivory/10 text-pehno-ivory/40 py-4 font-medium uppercase tracking-[0.15em] text-sm cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-pehno-ivory/15">
                <div className="text-center">
                  <p className="text-xs text-pehno-ivory/60 uppercase tracking-[0.1em] font-medium">Verified Quality</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-pehno-ivory/60 uppercase tracking-[0.1em] font-medium">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-pehno-ivory/60 uppercase tracking-[0.1em] font-medium">Secure Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reviews List */}
          <div className="lg:col-span-2">
            <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase">Reviews</span>
            <h2 className="mt-3 text-3xl font-serif font-light text-pehno-black mb-8 uppercase tracking-wide">Customer Reviews</h2>

            {reviews.length === 0 ? (
              <div className="bg-pehno-ivory p-12 text-center border border-pehno-black/10">
                <p className="text-pehno-charcoal text-lg">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-pehno-black/10 p-6 hover:border-pehno-black/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIcon key={i} filled={i < review.rating} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-pehno-charcoal/70">{review.user_name || "Anonymous"}</p>
                      </div>
                    </div>
                    <p className="text-pehno-charcoal leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Stats & Form */}
          <div className="lg:col-span-1">
            {reviews.length > 0 && (
              <div className="border border-pehno-black/10 p-8 mb-8 bg-pehno-ivory">
                <div className="text-center">
                  <div className="text-5xl font-serif text-pehno-black mb-2">{avgRating}</div>
                  <div className="flex justify-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} filled={i < Math.round(avgRating)} />
                    ))}
                  </div>
                  <p className="text-pehno-charcoal/70 text-sm">Based on {reviews.length} reviews</p>
                </div>
              </div>
            )}

            <h3 className="text-xl font-serif text-pehno-black mb-6 uppercase tracking-wide">Write a Review</h3>
            <ReviewForm productId={product.id} onReviewAdded={handleReviewAdded} />
          </div>
        </div>
      </div>
    </div>
  );
}

const StarIconLight = ({ filled = false }) => (
  <svg className={`w-4 h-4 ${filled ? 'fill-pehno-ivory text-pehno-ivory' : 'fill-pehno-ivory/20 text-pehno-ivory/20'}`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

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

      setMessage("Added to cart!");
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
          <label className="block text-xs font-semibold text-pehno-ivory/60 uppercase tracking-[0.15em] mb-2">Quantity</label>
          <select
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full px-4 py-3 border border-pehno-ivory/20 bg-transparent text-pehno-ivory focus:outline-none focus:border-pehno-ivory transition-colors"
          >
            {Array.from({ length: maxQuantity }, (_, i) => i + 1).map(num => (
              <option key={num} value={num} className="text-pehno-black">{num} {num === 1 ? 'item' : 'items'}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-pehno-ivory text-pehno-black py-3 font-medium uppercase tracking-[0.15em] text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </form>
      
      {message && (
        <div className={`p-4 text-sm font-medium border ${
          message.includes("Added") 
            ? "border-pehno-ivory/30 text-pehno-ivory bg-pehno-ivory/5" 
            : "border-red-400/50 text-red-300 bg-red-950/20"
        }`}>
          {message}
        </div>
      )}

      {maxQuantity <= 5 && maxQuantity > 0 && !message.includes("Added") && (
        <div className="border border-pehno-ivory/20 p-3 text-sm text-pehno-ivory/70">
          Only {maxQuantity} item(s) left in stock!
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
      <div className="border border-pehno-black/15 bg-pehno-ivory p-6 text-center">
        <h3 className="text-xl font-serif text-pehno-black mb-2 uppercase tracking-wide">Thank You</h3>
        <p className="text-pehno-charcoal mb-4 text-sm">Your review has been submitted successfully.</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setComment("");
            setRating(5);
          }}
          className="text-pehno-black text-sm underline hover:opacity-70"
        >
          Write Another Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="border border-red-300 bg-red-50 p-4 text-red-700 text-sm">
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Rating Selection */}
      <div>
        <label className="block text-xs font-semibold text-pehno-black uppercase tracking-[0.15em] mb-3">
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
              className="transition-all duration-200 transform hover:scale-110"
            >
              <svg
                className={`w-8 h-8 transition-all duration-300 ${
                  star <= (hoverRating || rating)
                    ? 'fill-pehno-black text-pehno-black'
                    : 'fill-pehno-black/15 text-pehno-black/15'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-pehno-charcoal/70">
          {rating === 1 && "Poor - Needs Improvement"}
          {rating === 2 && "Fair - Below Average"}
          {rating === 3 && "Good - Meets Expectations"}
          {rating === 4 && "Very Good - Highly Satisfied"}
          {rating === 5 && "Excellent - Highly Recommended"}
        </p>
      </div>

      {/* Comment Section */}
      <div>
        <label className="block text-xs font-semibold text-pehno-black uppercase tracking-[0.15em] mb-3">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          placeholder="Share your experience with this product..."
          className="w-full border border-pehno-black/20 px-4 py-3 bg-white text-pehno-black placeholder-pehno-charcoal/40 focus:outline-none focus:border-pehno-black transition-all resize-none text-base"
        />
        <p className="text-xs text-pehno-charcoal/50 mt-2">
          {comment.length} characters (minimum 10 required)
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !comment.trim()}
        className="w-full bg-pehno-black text-pehno-ivory px-6 py-3 font-medium uppercase tracking-[0.15em] text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
