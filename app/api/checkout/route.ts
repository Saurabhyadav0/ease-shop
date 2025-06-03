import { NextResponse } from 'next/server';
import { z } from 'zod';

const orderSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  cardNumber: z.string(),
  cardExpiry: z.string(),
  cardCvc: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      image: z.string(),
      price: z.number(),
      quantity: z.number(),
    })
  ),
  totalPrice: z.number(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error.errors }, { status: 400 });
    }

    // TODO: Save order to your DB (e.g., MongoDB, Supabase)
    // Example:
    // await db.orders.insertOne(parsed.data);

    return NextResponse.json({ message: 'Order saved successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
