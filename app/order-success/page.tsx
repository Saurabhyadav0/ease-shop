"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto py-12 px-4 sm:px-6 md:px-8 text-center">
      {/* Success circle icon */}
      <div className="mx-auto mb-8 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-green-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 sm:h-12 sm:w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-4">
        Payment Successful!
      </h1>

      <p className="text-base sm:text-lg text-gray-700 mb-8">
        Your order has been placed successfully.
      </p>

      <div className="bg-white shadow-md rounded-lg p-5 sm:p-6 md:p-8 text-left border border-green-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
        <p className="mb-2 text-sm sm:text-base">
          <span className="font-medium">Order ID:</span> {orderId}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-medium">Payment ID:</span> {paymentId}
        </p>
      </div>

      <button
        onClick={() => router.push("/products")}
        className="mt-8 sm:mt-10 inline-block px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base"
      >
        Continue Shopping
      </button>
    </div>
  );
}
