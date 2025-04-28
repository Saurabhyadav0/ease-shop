
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCartStore from '@/store/useCartStore';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  isCheckout?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ isCheckout = false }) => {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  
  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-6 text-center bg-white">
        <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-4">Add some products to your cart</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-bold">Order Summary</h3>
      </div>
      
      <div className="p-4 max-h-[400px] overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-3 border-b last:border-0">
            <div className="w-16 h-16 bg-gray-50 rounded overflow-hidden border relative">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill
                className="object-contain p-1"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.id}`} className="font-medium line-clamp-1 hover:text-shop-primary">
                {item.title}
              </Link>
              <div className="text-shop-primary font-bold">${item.price.toFixed(2)}</div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
              
              {!isCheckout && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={14} />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${totalPrice().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${totalPrice().toFixed(2)}</span>
        </div>
        
        {!isCheckout && (
          <Button className="w-full mt-4 bg-shop-primary hover:bg-shop-primary/90">
            <Link href="/checkout" className="w-full">
              Proceed to Checkout
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
