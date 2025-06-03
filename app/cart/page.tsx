"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useCartStore";
import CartSummary from "@/components/checkout/CartSummary";

export default function CartPage() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You haven&apos;t added anything to your cart yet. Start shopping now!
        </p>
        <Button size="lg" className="bg-shop-primary hover:bg-shop-primary/90 text-white dark:text-white">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Cart</h1>
      <CartSummary />

      <div className="mt-8 text-right">
        <Link href="/checkout">
        </Link>
      </div>
    </div>
  );
}
