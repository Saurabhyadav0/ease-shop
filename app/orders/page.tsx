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
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((order) => (
        <div key={order._id} className="mb-4 border p-4 rounded shadow">
          <div className="flex justify-between">
            <span className="font-semibold">Order ID: {order._id}</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
          <div>Total: ₹{order.total}</div>
          <ul className="mt-2">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} - ₹{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
