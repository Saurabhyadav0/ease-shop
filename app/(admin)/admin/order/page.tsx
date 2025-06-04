"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface Order {
  _id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
}

export default function AdminOrdersPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Correctly fetch public admin emails
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

  // Safely access the user's email
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const isAdmin = isSignedIn && email && adminEmails.includes(email);

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push("/");
    }
  }, [isLoaded, isAdmin]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/get-orders");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchOrders();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return <p className="text-center mt-10">Checking permissions...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Customer Orders</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id} className="p-4 shadow">
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Contact:</strong> {order.contact}</p>
              <p><strong>Address:</strong> {order.address}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
