"use client"
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPageClient({ initialProducts, categories }) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Sync selected category from the ?category= URL query param (matches category name, case-insensitive)
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const matched = categories.find(
        (c) => c.name.toLowerCase() === categoryParam.toLowerCase()
      );
      if (matched) {
        setSelectedCategory(String(matched.id));
      }
    }
  }, [searchParams, categories]);

  // Advanced filtering and sorting
  const filteredProducts = useMemo(() => {
    let result = initialProducts;

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category_id === parseInt(selectedCategory));
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        result = [...result].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "stock":
        result = [...result].sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        break;
    }

    return result;
  }, [initialProducts, searchQuery, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
  };

  const activeFilters = [searchQuery, selectedCategory !== "all"].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-pehno-offwhite text-pehno-black">
      {/* Header Section */}
      <div className="bg-pehno-black text-pehno-ivory px-6 md:px-16 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-pehno-ivory/70 hover:text-pehno-ivory transition-colors mb-6 inline-block text-xs uppercase tracking-[0.2em]"
          >
            &larr; Back to Home
          </Link>

          <div className="mb-10">
            <span className="text-pehno-ivory/60 text-xs tracking-[0.4em] uppercase">Collections</span>
            <h1 className="mt-3 text-5xl md:text-6xl font-serif font-light text-pehno-ivory uppercase tracking-[0.1em]">
              Explore Collections
            </h1>
            <p className="mt-4 text-lg text-pehno-ivory/60 font-light max-w-2xl">
              Discover our full selection of PEHNO pieces — timeless silhouettes crafted with quality fabrics.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-pehno-black bg-pehno-ivory focus:outline-none focus:ring-1 focus:ring-pehno-ivory/50 transition-all duration-300 text-base"
            />
            <Search className="absolute right-5 top-4 w-5 h-5 text-pehno-black/60 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-light text-pehno-black uppercase tracking-wide">
                {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-pehno-charcoal mt-2 text-sm">
                {selectedCategory !== "all" && `Category: ${categories.find(c => c.id === parseInt(selectedCategory))?.name}`}
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-pehno-black text-pehno-ivory px-5 py-3 font-medium uppercase tracking-[0.15em] text-xs flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilters > 0 && <span className="bg-pehno-ivory text-pehno-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{activeFilters}</span>}
            </button>
          </div>

          <div className="flex gap-10">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block w-60 flex-shrink-0">
              <div className="sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-semibold text-pehno-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </h3>
                  {activeFilters > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="text-[11px] text-pehno-charcoal hover:text-pehno-black transition-colors uppercase tracking-wider underline"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-8 pb-8 border-b border-pehno-black/10">
                  <label className="text-xs font-semibold text-pehno-black block mb-3 uppercase tracking-[0.15em]">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-pehno-black/20 px-4 py-3 bg-white text-pehno-black focus:outline-none focus:border-pehno-black transition-all"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="text-xs font-semibold text-pehno-black block mb-3 uppercase tracking-[0.15em]">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-pehno-black/20 px-4 py-3 bg-white text-pehno-black focus:outline-none focus:border-pehno-black transition-all"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="stock">Most in Stock</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setShowFilters(false)}>
                <div className="bg-pehno-ivory p-8 m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-serif text-pehno-black uppercase tracking-wide">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-pehno-black hover:opacity-60"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Category */}
                    <div>
                      <label className="text-xs font-semibold text-pehno-black block mb-3 uppercase tracking-[0.15em]">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border border-pehno-black/20 px-4 py-3 bg-white text-pehno-black"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort */}
                    <div>
                      <label className="text-xs font-semibold text-pehno-black block mb-3 uppercase tracking-[0.15em]">Sort</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full border border-pehno-black/20 px-4 py-3 bg-white text-pehno-black"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="stock">Most in Stock</option>
                      </select>
                    </div>

                    {activeFilters > 0 && (
                      <button
                        onClick={() => {
                          handleClearFilters();
                          setShowFilters(false);
                        }}
                        className="w-full text-pehno-black font-medium py-3 border border-pehno-black uppercase tracking-[0.15em] text-sm transition-colors hover:bg-pehno-black hover:text-pehno-ivory"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid — large, premium cards */}
            <div className="flex-1 flex flex-col items-stretch w-full">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-32 px-6 bg-pehno-ivory border border-pehno-black/10">
                  <h3 className="text-3xl font-serif text-pehno-black mb-3 uppercase tracking-wide">No Products Found</h3>
                  <p className="text-lg text-pehno-charcoal mb-10">
                    Try adjusting your filters or search terms to discover our collection
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-pehno-black text-pehno-ivory px-10 py-4 font-medium uppercase tracking-[0.15em] text-sm hover:opacity-90 transition-opacity"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="w-full">
                      <ProductCard product={product} isDeal={product.deal === 1} size="lg" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
