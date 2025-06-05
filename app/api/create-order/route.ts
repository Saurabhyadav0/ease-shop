import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount } = body;

    console.log("Amount received (paise):", amount);
    console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "Exists" : "Missing");

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount), // ✅ ensure it's an integer
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("🔥 Razorpay Order Error:", error);
    return NextResponse.json({ message: "Order creation failed", error: error.message }, { status: 500 });
  }
}
