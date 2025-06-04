"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CustomerForm() {
  const [form, setForm] = useState({ name: "", email: "", contact: "", address: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(form).every((field) => field.trim() !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/save-customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/checkout");
    } else {
      alert("Submission failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Enter Your Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <Button type="submit" disabled={loading || !isFormValid} className="w-full bg-green-600 text-white">
          {loading ? "Submitting..." : "Proceed to Checkout"}
        </Button>
      </form>
    </div>
  );
}
