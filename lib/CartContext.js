"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = useCallback(async () => {
    if (!isSignedIn) {
      setCartCount(0);
      return;
    }
    try {
      const response = await fetch("/api/check_cart");
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.count || 0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      refreshCartCount();
    } else if (isLoaded && !isSignedIn) {
      setCartCount(0);
    }
  }, [isLoaded, isSignedIn, refreshCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
