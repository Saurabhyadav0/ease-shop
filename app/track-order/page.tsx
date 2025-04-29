"use client";
import { useState } from "react";

type TrackingInfo = {
  status: string;
  estimatedDelivery: string;
};

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);

  const trackOrder = async () => {
    // Simulate API call
    if (orderId) {
      setTrackingInfo({ status: "Shipped", estimatedDelivery: "2025-05-01" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Track Your Order
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Order ID"
          className="w-full p-4 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          onClick={trackOrder}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Track Order
        </button>
      </div>

      {trackingInfo && (
        <div className="mt-6 text-lg text-gray-800 dark:text-gray-300">
          <p>Status: {trackingInfo.status}</p>
          <p>Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
