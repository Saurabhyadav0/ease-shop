"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useCartStore";
import CartSummary from "@/components/checkout/CartSummary";
import { useRouter } from "next/navigation"; 


// Add Razorpay type to window for TypeScript
declare global {
  interface Window {
    Razorpay;
  }
}

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();

  const [isLoading, setIsLoading] = useState(false);

  // Conversion rate (replace with live rate in production!)
  const dollarToInr = 83; // 1 USD = 83 INR

  // Calculate total in dollars
  const totalUSD = items.reduce(
    (sum: number, item) => sum + item.price * item.quantity,
    0
  );

  // Convert to INR
  const totalINR = totalUSD * dollarToInr;
    const router = useRouter();

  // Load Razorpay script once
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
    if (!totalINR || totalINR <= 0) {
      throw new Error("Total amount must be greater than zero");
    }

    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalINR }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to create order: " + data.message);
    }

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
      console.log("Order ID:", order_id);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: totalINR * 100, // in paise
        currency: "INR",
        name: `Payment: ₹${totalINR.toFixed(2)}`, // Show final INR amount
        description: "Thank you for your purchase",
        order_id,
        handler: async function (response) {
          console.log("Payment response:", response);

          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            clearCart();
            // Redirect to order success page with order & payment ids
          router.push(
              `/order-success?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}`
            );
          } else {
            alert("Payment verification failed: " + verifyData.message);
          }

          setIsLoading(false);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new (window).Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed: " + response.error.description);
        setIsLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during payment.");
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You haven&apos;t added anything to your cart yet. Start shopping now!
        </p>
        <Link href="/products" passHref>
          <Button
            size="lg"
            className="bg-shop-primary hover:bg-shop-primary/90 text-white dark:text-white"
          >
            Shop Now
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Checkout - Total: ₹{totalINR.toFixed(2)}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Removed CheckoutForm */}
          <Button
            onClick={handlePayment}
            size="lg"
            disabled={isLoading}
            className={`mt-6 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white dark:text-white`}
          >
            {isLoading ? "Processing Payment..." : "Pay with Razorpay"}
          </Button>
        </div>
        <div>
          <CartSummary isCheckout />
        </div>
      </div>
    </div>
  );
}
