// /app/api/get-user-order/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order"; // ✅ Make sure this is your Order model

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
