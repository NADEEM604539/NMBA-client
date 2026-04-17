"use client"
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPageClient({ initialProducts, categories }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDeals, setShowDeals] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

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

    // Filter by deals
    if (showDeals === "deals") {
      result = result.filter((p) => p.deal === 1);
    } else if (showDeals === "regular") {
      result = result.filter((p) => p.deal === 0);
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
  }, [initialProducts, searchQuery, selectedCategory, showDeals, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setShowDeals("all");
    setSortBy("newest");
  };

  const activeFilters = [searchQuery, selectedCategory !== "all", showDeals !== "all"].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0E6D2] via-[#E8DCC8] to-[#DFD0B8] text-[#3D2817]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#102C26] to-[#1A5F4F] text-white px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-[#FFF2E1] hover:text-white font-semibold transition-colors mb-6 inline-block text-sm"
          >
            ← Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-3 uppercase tracking-wider">
              Explore Collections
            </h1>
            <p className="text-lg text-[#D4E8E5] font-light">
              Discover our premium selection of luxury shirts and contemporary garments crafted with excellence
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full text-[#3D2817] bg-white focus:outline-none focus:ring-4 focus:ring-[#1a4d42]/30 transition-all duration-300 text-base shadow-xl"
            />
              <Search className="absolute right-5 top-4 w-6 h-6 text-[#1a4d42] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#102C26]">
                {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-[#6B4F2F] mt-2 text-sm font-medium">
                {selectedCategory !== "all" && `Category: ${categories.find(c => c.id === parseInt(selectedCategory))?.name}`}
                {showDeals !== "all" && `${selectedCategory !== "all" ? " • " : ""}${showDeals === "deals" ? "Special Deals" : "Regular Products"}`}
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white border-2 border-[#1a4d42] text-[#1a4d42] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#1a4d42]/10 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilters > 0 && <span className="bg-[#1a4d42] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFilters}</span>}
            </button>
          </div>

          <div className="flex gap-6">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-gradient-to-br from-white to-[#FDF9F3] rounded-3xl p-6 border-2 border-[#F7E7CE] shadow-xl sticky top-24 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#102C26] flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#1a4d42]" />
                    Filters
                  </h3>
                  {activeFilters > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="text-xs text-[#1a4d42] hover:text-[#0d3a33] font-bold transition-colors uppercase tracking-wider"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6 pb-6 border-b-2 border-[#F0F0F0]">
                  <label className="text-xs font-bold text-[#102C26] block mb-3 uppercase tracking-wide">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border-2 border-[#F7E7CE] rounded-xl px-4 py-3 bg-[#F9F9F9] text-[#3D2817] focus:outline-none focus:border-[#248D76] focus:ring-2 focus:ring-[#248D76]/20 transition-all font-medium"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Type Filter */}
                <div className="mb-6 pb-6 border-b-2 border-[#F0F0F0]">
                  <label className="text-xs font-bold text-[#102C26] block mb-3 uppercase tracking-wide">Type</label>
                  <div className="space-y-3">
                    {[
                      { value: "all", label: "All Products" },
                      { value: "regular", label: "Regular Products" },
                      { value: "deals", label: "Special Deals" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="deals"
                          value={option.value}
                          checked={showDeals === option.value}
                          onChange={(e) => setShowDeals(e.target.value)}
                          className="w-5 h-5 accent-[#1a4d42] cursor-pointer"
                        />
                        <span className="text-[#3D2817] group-hover:text-[#1a4d42] transition-colors font-medium">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="text-xs font-bold text-[#102C26] block mb-3 uppercase tracking-wide">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border-2 border-[#F7E7CE] rounded-xl px-4 py-3 bg-[#F9F9F9] text-[#3D2817] focus:outline-none focus:border-[#248D76] focus:ring-2 focus:ring-[#248D76]/20 transition-all font-medium"
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
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
                <div className="bg-white rounded-3xl p-8 m-4 max-h-[90vh] overflow-y-auto border-2 border-[#F7E7CE] shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-[#102C26]">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-[#1a4d42] hover:text-[#0d3a33]"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Category */}
                    <div>
                      <label className="text-sm font-bold text-[#102C26] block mb-3 uppercase tracking-wide">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border-2 border-[#F7E7CE] rounded-xl px-4 py-3 bg-[#F9F9F9] text-[#3D2817] font-medium"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Type */}
                    <div>
                      <label className="text-sm font-bold text-[#102C26] block mb-3 uppercase tracking-wide">Type</label>
                      <div className="space-y-2">
                        {[
                          { value: "all", label: "All Products" },
                          { value: "regular", label: "Regular Products" },
                          { value: "deals", label: "Special Deals" },
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="deals-mobile"
                              value={option.value}
                              checked={showDeals === option.value}
                              onChange={(e) => setShowDeals(e.target.value)}
                              className="w-4 h-4 accent-[#1a4d42]"
                            />
                            <span className="text-[#3D2817] font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Sort */}
                    <div>
                      <label className="text-sm font-bold text-[#102C26] block mb-3 uppercase tracking-wide">Sort</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full border-2 border-[#F7E7CE] rounded-xl px-4 py-3 bg-[#F9F9F9] text-[#3D2817] font-medium"
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
                        className="w-full text-[#1a4d42] hover:text-[#0d3a33] font-bold py-3 border-2 border-[#1a4d42] rounded-xl transition-colors uppercase tracking-wide"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1 flex flex-col items-stretch w-full">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-32 px-6 rounded-3xl bg-gradient-to-br from-[#FFF2E1] to-[#F5E6D3] border-2 border-[#D9CDB5] shadow-lg">
                  <div className="mb-8">
                    <div className="text-8xl mb-4 inline-block">🔍</div>
                  </div>
                  <h3 className="text-4xl font-bold text-[#102C26] mb-3">No Products Found</h3>
                  <p className="text-lg text-[#6B4F2F] mb-10 font-medium">
                    Try adjusting your filters or search terms to discover our collection
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center auto-rows-max">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="w-full max-w-xs">
                      <div className="transition-all duration-300 hover:scale-105 cursor-pointer">
                        <ProductCard product={product} isDeal={product.deal === 1} />
                      </div>
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
