import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ message: "Missing payment details" }, { status: 400 });
  }

  const key_secret = process.env.RAZORPAY_KEY_SECRET!;
  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    return NextResponse.json({ message: "Payment verified successfully" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Invalid signature, payment not verified" }, { status: 400 });
  }
}
