"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCartStore from "@/store/useCartStore";
import ToggleButton from "../ToggleButton";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const Navbar: React.FC = () => {
  const { totalItems } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false); // To track client-side mounting

  useEffect(() => {
    setIsMounted(true); // This will run after the first render on the client side
  }, []);

  useEffect(() => {
    if (searchParams) {
      const currentSearch = searchParams.get("search") || "";
      setSearchQuery(currentSearch);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Render the navbar only after mounting to avoid hydration mismatch
  if (!isMounted) return null;

  return (
    <header className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 shadow-mdbg-white dark:bg-gray-900 border-b dark:border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-shop-primary dark:text-white"
          >
            ShopEase
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full py-1.5 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-shop-primary/50 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                size={18}
                className="absolute left-3 top-2 text-gray-400 dark:text-gray-300"
              />
              <button type="submit" className="sr-only">
                Search
              </button>
            </form>
          </div>

          {/* Links and Icons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className="text-gray-600 hover:text-shop-primary dark:text-gray-300 dark:hover:text-shop-primary"
            >
              Products
            </Link>

            <Link href="/checkout" className="relative">
              <Button variant="ghost" className="relative p-2 dark:text-white">
                <ShoppingCart size={22} />
                {totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-shop-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </Button>
            </Link>
            {/* Authentication Buttons */}
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Toggle Theme Button */}
            <div>
              <ToggleButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
