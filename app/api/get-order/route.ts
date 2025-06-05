// app/api/get-orders/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // adjust path as needed
import CustomerInfo from "@/models/CustomerInfo";

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await CustomerInfo.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    return new NextResponse("Failed to fetch orders", { status: 500 });
  }
}
