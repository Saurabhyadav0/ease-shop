'use client';

import React from "react";
import { useRouter, useParams } from "next/navigation";  // For routing actions and dynamic params
import { getProductById } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useCartStore from "@/store/useCartStore";
import { toast } from "sonner";
import Image from "next/image";

export default function ProductDetailPage() {
  const router = useRouter();
  const { addItem } = useCartStore();

  // Get the dynamic `id` directly from the query params
  const params = useParams();  // Fetch dynamic route params like /products/[id]
  const id = params?.id as string;  // Safely extract `id` and assert it as a string

  const productId = parseInt(id as string, 10);  // Parse to integer

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId && !isNaN(productId),
  });

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success(`${product.title} added to cart`);
    }
  };

  // Error handling for invalid or non-existent product ID
  if (!productId || isNaN(productId)) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Invalid Product ID</h2>
        <p className="text-gray-600 mb-6">
          The product ID you&aposre looking for doesn&apost exist.
        </p>
        <Button onClick={() => router.push("/products")}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </Button>
      </div>
    );
  }

  // Error case when product is not found
  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn&apost find the product you&aposre looking for.
        </p>
        <Button onClick={() => router.push("/products")}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => router.push("/products")}
        className="mb-4 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Products
      </Button>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border dark:border-gray-700 flex items-center justify-center">
            <Skeleton className="w-full aspect-square" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border dark:border-gray-700 flex items-center justify-center">
            <div className="relative w-full h-80">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <span className="bg-shop-accent/10 text-shop-accent px-3 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold mt-2 dark:text-white">{product.title}</h1>
            <div className="flex items-center mt-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < Math.floor(product.rating.rate)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold text-shop-primary dark:text-shop-primary mb-4">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="bg-shop-primary hover:bg-shop-primary/90 dark:bg-shop-primary/90 dark:hover:bg-shop-primary/80"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
