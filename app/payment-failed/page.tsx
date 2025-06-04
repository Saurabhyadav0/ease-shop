"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FailedPaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center">
        <div className="mb-6">
          <Image
            src="/payment-failed.png" // Make sure this image exists in your public folder
            alt="Payment Failed Illustration"
            width={280}
            height={280}
            className="mx-auto object-contain"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 mb-3">
          Payment Failed
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Oops! Something went wrong with your payment. Please try again or
          contact support if the issue persists.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="sm"
            className="bg-shop-primary hover:bg-shop-primary/90 dark:bg-shop-primary-dark dark:hover:bg-shop-primary-dark/90 text-white rounded-md px-6 py-2"
            asChild
          >
            <Link href="/checkout">Retry Payment</Link>
          </Button>
          <Button
            size="sm"
            className="bg-shop-primary hover:bg-shop-primary/90 dark:bg-shop-primary-dark dark:hover:bg-shop-primary-dark/90 text-white rounded-md px-6 py-2"
            asChild
          >
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
