"use client";
import Link from "next/link";
import { PackageSearch, Truck, Clock } from "lucide-react";

const FastShippingPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
        🚀 Fast Shipping
      </h1>

      <div className="mb-12 text-lg text-gray-800 dark:text-gray-300 max-w-3xl mx-auto text-center">
        <p>
          We understand the importance of fast and reliable shipping. That’s why we offer multiple expedited options
          to ensure your products arrive right when you need them.
        </p>
      </div>

      {/* Shipping Options */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2">Shipping Options</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <Truck className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200 mb-1">Same-Day Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400">Get your orders delivered within the same day! Available for select products and locations.</p>
          </li>
          <li className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <Clock className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200 mb-1">2-Day Shipping</h3>
            <p className="text-gray-600 dark:text-gray-400">Orders placed before 2:00 PM will be delivered within two business days.</p>
          </li>
          <li className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <Truck className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200 mb-1">Free Standard Shipping</h3>
            <p className="text-gray-600 dark:text-gray-400">Enjoy free shipping on orders over $50. Delivery times may vary based on location.</p>
          </li>
        </ul>
      </div>

      {/* Track Order */}
      <div className="mb-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 shadow-inner">
        <div className="flex items-center mb-4">
          <PackageSearch className="w-7 h-7 text-blue-600 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Track Your Order</h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          As soon as your order is shipped, we’ll send you a tracking link. Click below to check your shipping status.
        </p>
        <Link href="/track-order">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-lg shadow-md transition">
            Track My Order
          </button>
        </Link>
      </div>

      {/* Eligible Products */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
          Products with Fast Shipping
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Look for the <span className="font-medium text-blue-600">&quot;Fast Shipping&quot;</span> badge on product pages to find
          items eligible for same-day or 2-day delivery.
        </p>
      </div>

      {/* Shop Button */}
      <div className="text-center">
        <Link href="/products">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FastShippingPage;
