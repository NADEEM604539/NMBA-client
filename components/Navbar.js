"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Menu, X, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FFF2E1] border-b border-[#D4A574]/30 shadow-xl">
      {/* Full width container */}
      <div className="w-full flex items-center justify-between px-4 md:px-6 lg:px-16 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-[#A79277] shadow-md flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="NMBA Luxe Wear Logo"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-[#102C26] tracking-wide whitespace-nowrap">
            NMBA<span className="text-[#A79277]"> Luxe</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 bg-[#102C26] px-2 py-1 rounded-xl border border-[#0A1A15]/40">
          <NavLink href="/" pathname={pathname} searchParams={searchParams}>Home</NavLink>
          <NavLink href="/products" pathname={pathname} searchParams={searchParams}>All Products</NavLink>
          <NavLink href="/products?deals=deals" pathname={pathname} searchParams={searchParams}>Deals</NavLink>
          <NavLink href="/orders" pathname={pathname} searchParams={searchParams}>Orders</NavLink>
          <NavLink href="/chat" pathname={pathname} searchParams={searchParams}>Chat</NavLink>
          <NavLink href="/about" pathname={pathname} searchParams={searchParams}>About</NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Chat */}
          <Link
            href="/chat"
            className="md:hidden p-2 rounded-lg hover:bg-[#A79277]/20 transition flex-shrink-0"
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-[#102C26]" />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 rounded-lg hover:bg-[#A79277]/20 transition flex-shrink-0"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-[#102C26]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#102C26] text-[#FFF2E1] text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in" className="flex-shrink-0">
              <button className="px-3 md:px-5 py-2 bg-[#102C26] hover:bg-[#0A1A15] text-[#FFF2E1] font-semibold rounded-lg transition-all duration-200 shadow-md text-sm md:text-base">
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#102C26] flex-shrink-0"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden w-full bg-[#102C26] border-t border-[#0A1A15]/40 px-6 py-6 space-y-3">
          <MobileLink href="/" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>Home</MobileLink>
          <MobileLink href="/products" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>All Products</MobileLink>
          <MobileLink href="/products?deals=deals" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>Deals</MobileLink>
          <MobileLink href="/orders" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>Orders</MobileLink>
          <MobileLink href="/about" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>About</MobileLink>
          <MobileLink href="/chat" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>Chat</MobileLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, pathname, searchParams }) {
  let isActive = false;

  if (href === "/") {
    isActive = pathname === "/";
  } else if (href.includes("?")) {
    // For URLs with query parameters (like /products?deals=deals)
    const [path, query] = href.split("?");
    const currentDealsParam = searchParams.get("deals");
    isActive = pathname === path && currentDealsParam === "deals";
  } else {
    // For regular paths
    isActive = pathname.startsWith(href) && pathname === href;
  }

  return (
    <Link
      href={href}
      className={`px-3 lg:px-5 py-2 lg:py-3 rounded-lg text-sm lg:text-lg font-bold transition-all duration-200 ${
        isActive
          ? "bg-[#F7E7CE] text-[#102C26] shadow-md"
          : "text-[#F7E7CE] hover:bg-[#1A4A42] hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, setOpen, pathname, searchParams }) {
  let isActive = false;

  if (href === "/") {
    isActive = pathname === "/";
  } else if (href.includes("?")) {
    // For URLs with query parameters (like /products?deals=deals)
    const [path, query] = href.split("?");
    const currentDealsParam = searchParams.get("deals");
    isActive = pathname === path && currentDealsParam === "deals";
  } else {
    // For regular paths
    isActive = pathname.startsWith(href) && pathname === href;
  }

  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`block w-full px-5 py-3 rounded-lg text-lg font-bold transition ${
        isActive
          ? "bg-[#F7E7CE] text-[#102C26]"
          : "text-[#F7E7CE] hover:bg-[#1A4A42] hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}