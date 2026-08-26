"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <div className="absolute top-0 z-50 w-full">
      {/* Announcement Bar */}
      <div className="w-full bg-pehno-black text-pehno-ivory text-center text-[11px] md:text-xs tracking-[0.15em] uppercase py-2 px-4">
        Something distinctive is taking shape — Coming soon - PEHNO.
      </div>

      {/* Navbar */}
      <nav
        className={`w-full transition-colors duration-500 border-b ${
          transparent
            ? "bg-transparent border-transparent absolute top-8 left-0"
            : "bg-pehno-black border-pehno-charcoal/40 relative"
        }`}
      >
        <div className="w-full grid grid-cols-3 items-center px-4 md:px-6 lg:px-16 py-4">
          {/* Left Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 justify-self-start">
            <NavLink href="/products?category=new-arrivals" transparent={transparent}>New Arrivals</NavLink>
            <NavLink href="/#collections" transparent={transparent}>Collections</NavLink>
          </div>

          {/* Mobile Toggle (Left on mobile) */}
          <button
            className={`md:hidden justify-self-start ${transparent ? "text-pehno-ivory" : "text-pehno-ivory"}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Centered Logo */}
          <Link href="/" className="justify-self-center flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-pehno-ivory tracking-[0.3em] whitespace-nowrap uppercase">
              PEHNO
            </h1>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-3 md:gap-5 justify-self-end">
            <Link href="/products" className="hidden sm:inline-flex p-1 hover:opacity-70 transition">
              <Search className="w-5 h-5 text-pehno-ivory" />
            </Link>

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link href="/sign-in" className="p-1 hover:opacity-70 transition">
                <User className="w-5 h-5 text-pehno-ivory" />
              </Link>
            )}

            <Link href="/cart" className="relative p-1 hover:opacity-70 transition">
              <ShoppingCart className="w-5 h-5 text-pehno-ivory" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pehno-ivory text-pehno-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Secondary link row (desktop, centered under logo on larger screens) */}
        <div className="hidden md:flex items-center justify-center gap-8 pb-4 -mt-2">
          <NavLink href="/#story" transparent={transparent}>Our Story</NavLink>
          <NavLink href="/chat" transparent={transparent}>Contact Us</NavLink>
          <NavLink href="/orders" transparent={transparent}>Orders</NavLink>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden w-full bg-pehno-black border-t border-pehno-charcoal/40 px-6 py-6 space-y-3">
          <MobileLink href="/" setOpen={setOpen}>Home</MobileLink>
          <MobileLink href="/products?category=new-arrivals" setOpen={setOpen}>New Arrivals</MobileLink>
          <MobileLink href="/#collections" setOpen={setOpen}>Collections</MobileLink>
          <MobileLink href="/#story" setOpen={setOpen}>Our Story</MobileLink>
          <MobileLink href="/chat" setOpen={setOpen}>Contact Us</MobileLink>
          <MobileLink href="/orders" setOpen={setOpen}>Orders</MobileLink>
        </div>
      )}
    </div>
  );
}

function NavLink({ href, children, transparent }) {
  return (
    <Link
      href={href}
      className="text-xs lg:text-sm font-medium uppercase tracking-[0.15em] text-pehno-ivory/90 hover:text-pehno-ivory transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, setOpen }) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className="block w-full py-2 text-sm font-medium uppercase tracking-[0.15em] text-pehno-ivory/90 hover:text-pehno-ivory transition"
    >
      {children}
    </Link>
  );
}