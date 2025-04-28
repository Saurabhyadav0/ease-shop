
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import useCartStore from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.title.substring(0, 20)}... added to cart`);
  };

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border transform hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-gray-50 relative">
        <div className="w-full h-full relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-2 right-2 bg-shop-accent/10 text-shop-accent px-2 py-0.5 rounded-full text-xs font-medium">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2 mb-2 group-hover:text-shop-primary transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-shop-primary hover:bg-shop-primary/90 transition-colors"
          >
            <ShoppingCart size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
