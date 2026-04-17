"use client";
import { useState } from "react";
import { Star, CheckCircle, AlertCircle } from "lucide-react";

export default function ReviewForm({ orderId, productId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setErrorMsg("Please write a comment");
      return;
    }

    if (comment.trim().length < 10) {
      setErrorMsg("Comment must be at least 10 characters");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/special_reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment,
          order_id: orderId,
          product_id: productId,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      setSubmitted(true);
      setSuccessMsg("Review submitted successfully! Thank you for your feedback.");
      setRating(5);
      setComment("");
      
      // Call parent callback if provided
      if (onReviewAdded) {
        onReviewAdded({ rating, comment });
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success State - Show after submission
  if (submitted) {
    return (
      <div className="mt-10 flex justify-center px-4 md:px-0">
        <div className="w-full max-w-2xl">
          <div className="bg-gradient-to-br from-[#F0F9F7] to-[#E8F5F2] border-2 border-[#1a4d42] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#1a4d42]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <div className="relative z-10 text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1a4d42] rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <CheckCircle className="w-20 h-20 text-[#1a4d42] animate-bounce" />
                </div>
              </div>

              {/* Success Title */}
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#102C26] mb-3">
                Thank You! 🎉
              </h3>

              {/* Success Message */}
              <p className="text-lg text-[#6B4F2F] mb-2 font-semibold">
                Your review has been submitted
              </p>
              <p className="text-[#A79277] mb-8 leading-relaxed">
                We appreciate your valuable feedback! Your review will help other customers discover quality products and may be featured on our site.
              </p>

              {/* Rating Display */}
              <div className="flex justify-center gap-2 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="relative">
                    <Star
                      className={`w-8 h-8 ${
                        i < rating
                          ? "fill-[#1a4d42] text-[#1a4d42]"
                          : "text-[#D9CDB5]"
                      } transition-all duration-300`}
                    />
                  </div>
                ))}
              </div>

              {/* Success Info Card */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#F7E7CE] mb-8">
                <p className="text-[#102C26] font-medium mb-2">Your Review:</p>
                <p className="text-[#6B4F2F] italic leading-relaxed">"{comment}"</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => window.location.reload()}
                className="inline-block bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider"
              >
                Back to Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Review Form State
  return (
    <div className="mt-10 flex justify-center px-4 md:px-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl"
      >
        <div className="bg-gradient-to-br from-[#F0F9F7] to-[#E8F5F2] border-2 border-[#1a4d42] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#1a4d42]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1a4d42]/5 rounded-full blur-2xl -ml-16 -mb-16"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#102C26] mb-2">
                Share Your Experience
              </h3>
              <p className="text-[#6B4F2F] text-lg">
                Help other customers by sharing your honest feedback
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 font-medium">{errorMsg}</p>
              </div>
            )}

            {/* Rating Selection */}
            <div className="mb-10">
              <label className="block text-lg font-bold text-[#102C26] mb-4">
                How would you rate this product?
              </label>
              <div className="flex justify-center gap-3 md:gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-all duration-200 transform hover:scale-125"
                  >
                    <Star
                      className={`w-12 h-12 md:w-14 md:h-14 transition-all duration-300 ${
                        star <= (hoverRating || rating)
                          ? "fill-[#1a4d42] text-[#1a4d42]"
                          : "text-[#D9CDB5]"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-[#6B4F2F] text-sm mt-3 font-medium">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            </div>

            {/* Comment Section */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-[#102C26] mb-3">
                Your Thoughts
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="5"
                placeholder="Tell us what you think about this product... (minimum 10 characters)"
                className="w-full border-2 border-[#F7E7CE] rounded-2xl px-6 py-4 bg-white text-[#3D2817] placeholder-[#A79277] focus:outline-none focus:border-[#1a4d42] focus:ring-2 focus:ring-[#1a4d42]/30 transition-all duration-300 resize-none text-lg font-medium"
              />
              <p className="text-sm text-[#A79277] mt-2 font-medium">
                {comment.length} characters (minimum 10 required)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !comment.trim()}
              className="w-full bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-wider"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>

            {/* Info Message */}
            <p className="text-center text-[#A79277] text-sm mt-6 font-medium">
              ✨ Your honest feedback helps us improve and helps customers make better choices
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
