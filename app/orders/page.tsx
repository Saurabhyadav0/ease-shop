"use client";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  total: number;
  createdAt: string;
  items: { name: string; price: number; quantity: number }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/get-user-order");
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        🧾 Your Previous Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order ID:
                  </p>
                  <p className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {order._id}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                Total Paid: ₹{order.total.toFixed(2)}
              </div>

              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Items:</p>
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between text-sm border-b border-dashed border-gray-300 pb-1"
                    >
                      <span className="text-gray-800 dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        ₹{item.price} × {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
