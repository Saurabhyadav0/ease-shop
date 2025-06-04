// app/api/save-order/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    const authResult = await auth();

    if (!authResult?.userId) {
      console.log("❌ Unauthorized: No user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { total, items } = body;

    console.log("📦 Received order:", { total, items });

    await connectToDatabase();

    const newOrder = await Order.create({
      userId: authResult.userId,
      total,
      items,
    });

    console.log("✅ Order saved:", newOrder);

    return NextResponse.json(
      { message: "Order saved", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error saving order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
