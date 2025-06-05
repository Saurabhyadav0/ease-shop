"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useCartStore";
import CartSummary from "@/components/checkout/CartSummary";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dollarToInr = 83;
  const totalUSD = items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const totalINR = totalUSD * dollarToInr;
  const totalPaise = Math.round(totalINR * 100); // ✅ Razorpay needs amount in paise

  useEffect(() => {
    if (!document.getElementById("razorpay-script")) {
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const createOrder = async () => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPaise }), // ✅ send amount in paise
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.id;
  };

  const handlePayment = async () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsLoading(true);

    try {
      const order_id = await createOrder();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: totalPaise, // ✅ amount in paise
        currency: "INR",
        name: "ShopEase",
        description: `Order Total: ₹${totalINR.toFixed(2)}`,
        order_id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              total: totalINR,
              items,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            clearCart();
            router.push(
              `/order-success?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}`
            );
          } else {
            router.push("/payment-failed");
          }

          setIsLoading(false);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#22c55e" },
        modal: {
          ondismiss: function () {
            router.push("/payment-failed");
            setIsLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16 px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add items to proceed with checkout.
        </p>
        <Link href="/products">
          <Button className="bg-shop-primary hover:bg-shop-primary/90 text-white px-6 py-2 rounded-full">
            Shop Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-900 dark:text-white text-center">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-full">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Order Summary
          </h2>
          <CartSummary isCheckout />

          <Button
            onClick={handlePayment}
            size="lg"
            disabled={isLoading}
            className={`mt-8 w-full ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {isLoading
              ? "Processing..."
              : `Pay ₹${totalINR.toFixed(2)} with Razorpay`}
          </Button>
        </div>
      </div>
    </div>
  );
}
