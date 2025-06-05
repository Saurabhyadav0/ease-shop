// app/api/admin/orders/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

const adminEmails = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(",").map(email => email.trim().toLowerCase())
  : [];

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

async function getUserById(userId: string) {
  const res = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user from Clerk");
  }
  return res.json();
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserById(userId);

    const primaryEmailId = user.primary_email_address_id;
    const emailObj = user.email_addresses.find(
      (email) => email.id === primaryEmailId
    );
    const email = emailObj?.email_address?.toLowerCase();

    if (!email || !adminEmails.includes(email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err: "Internal Server Error", message: err.message }, { status: 500 });
  }
}
