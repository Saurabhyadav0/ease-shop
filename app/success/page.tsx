// app/success/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Thank you for your purchase. Your order has been confirmed.
      </p>
      <Link href="/products" passHref>
        <Button
          as="a"
          size="lg"
          className="bg-shop-primary hover:bg-shop-primary/90 text-white dark:text-white"
        >
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
