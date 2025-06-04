"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 md:px-8 text-center">
      {/* ✅ Payment Illustration */}
      <Image
        src="/Successful.png" // ✅ Correct path
        alt="Payment Success"
        width={300}
        height={300}
        className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md object-contain dark:brightness-90"
        priority
      />

      {/* ✅ Success Icon */}
      <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* ✅ Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 dark:text-green-400 mb-4">
        Payment Successful!
      </h1>

      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8">
        Your order has been placed successfully.
      </p>

      {/* ✅ Order Details */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 sm:p-6 md:p-8 text-left border border-green-200 dark:border-green-800">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Details
        </h2>
        <p className="mb-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
          <span className="font-medium">Order ID:</span> {orderId}
        </p>
        <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
          <span className="font-medium">Payment ID:</span> {paymentId}
        </p>
      </div>

      {/* ✅ Button */}
      <button
        onClick={() => router.push("/products")}
        className="mt-8 sm:mt-10 inline-block px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base"
      >
        Continue Shopping
      </button>
    </div>
  );
}
