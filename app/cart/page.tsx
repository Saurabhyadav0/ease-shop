"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useCartStore";
import CartSummary from "@/components/checkout/CartSummary";

export default function CartPage() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-10 max-w-lg w-full text-center">
          <div className="relative mb-8">
            <Image
              src="/emptycart.webp"
              alt="Empty Cart Illustration"
              width={320}
              height={320}
              className="mx-auto rounded-md object-contain transition-transform hover:scale-105 duration-300"
            />
            <div className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-md text-xl">
              🛒
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white mb-3">
            Your cart is feeling lonely
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-base sm:text-lg">
            Looks like you haven't added anything yet. Start exploring now!
          </p>

          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full"
            asChild
          >
            <Link href="/products">Discover Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Your Cart
      </h1>

      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 sm:p-8">
        <CartSummary />
      </div>
    </div>
  );
}
