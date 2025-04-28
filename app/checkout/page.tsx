
"use client";

import React from 'react';
import CartSummary from '@/components/checkout/CartSummary';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import useCartStore from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items } = useCartStore();
  
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          You don&apost have any items in your cart yet. Browse our products and add some items!
        </p>
        <Button size="lg" className="bg-shop-primary hover:bg-shop-primary/90">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <CartSummary isCheckout />
        </div>
      </div>
    </>
  );
}
