"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useCartStore from "@/store/useCartStore";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  isCheckout?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ isCheckout = false }) => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearCart = () => {
    clearCart();
    setShowConfirm(false);
  };

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-6 text-center bg-white dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
          Your cart is empty
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Add some products to your cart
        </p>
        <Link href="/products" passHref>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 dark:text-white">
            Order Summary
          </h3>
          {!isCheckout && (
            <Button
              variant="outline"
              size="sm"
              className="bg-shop-primary hover:bg-shop-primary/90 text-white rounded-md"
              onClick={() => setShowConfirm(true)}
            >
              Reset Cart
            </Button>
          )}
        </div>

        <div className="p-4 max-h-[400px] overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-3 border-b last:border-0 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded overflow-hidden border dark:border-gray-700 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.id}`}
                  className="font-medium line-clamp-1 hover:text-shop-primary text-gray-900 dark:text-white"
                >
                  {item.title}
                </Link>
                <div className="text-shop-primary font-bold">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center border rounded-md dark:border-gray-700">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 disabled:text-gray-400 dark:disabled:text-gray-600"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="w-8 text-center text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
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
                    className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="flex justify-between mb-2 text-gray-900 dark:text-white">
            <span>Subtotal</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-900 dark:text-white">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <Separator className="my-2 dark:bg-gray-700" />
          <div className="flex justify-between font-bold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>

          {!isCheckout && (
            <Button className="w-full mt-4 bg-shop-primary hover:bg-shop-primary/90 text-white">
              <Link href="/customer-info" className="w-full text-center">
                Proceed to Enter Details
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Are you sure you want to reset your cart?
            </h2>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="rounded-md"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white rounded-md"
                onClick={handleClearCart}
              >
                Yes, Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSummary;
