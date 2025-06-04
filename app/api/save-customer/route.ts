import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import CustomerInfo from "@/models/CustomerInfo";

export async function POST(req: Request) {
  try {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, contact, address } = body;

    if (!name || !contact || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const email = sessionClaims?.email || "unknown@example.com"; // fallback just in case

    const newCustomer = await CustomerInfo.create({
      userId,
      name,
      email,
      contact,
      address,
    });

    return NextResponse.json(
      { message: "Customer saved successfully", customer: newCustomer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving customer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
