import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import CustomerInfo from "@/models/CustomerInfo";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const orders = await CustomerInfo.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
