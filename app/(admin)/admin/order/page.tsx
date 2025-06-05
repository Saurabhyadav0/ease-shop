"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Order = {
  _id: string;
  userId: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  paymentId: string;
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {  isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/admin-order");
        if (res.status === 403) {
          alert("Unauthorized. Only admins can view this page.");
          router.push("/");
          return;
        }
        const data = await res.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoaded, router]);

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;

  if (orders.length === 0)
    return <div className="p-6 text-center">No orders found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        All Orders (Admin Panel)
      </h1>

      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full table-auto text-left text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Total (₹)</th>
              <th className="px-6 py-3">Payment ID</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t dark:border-gray-700">
                <td className="px-6 py-4">{order._id}</td>
                <td className="px-6 py-4">{order.userId}</td>
                <td className="px-6 py-4">
                  <ul className="list-disc pl-4">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} (₹{item.price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 font-semibold">₹{order.total}</td>
                <td className="px-6 py-4">{order.paymentId}</td>
                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
