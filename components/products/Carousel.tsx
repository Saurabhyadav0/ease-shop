"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  products: Product[];
};

const Carousel = ({ products }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (currentIndex < products.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative">
      {/* Carousel Items */}
      <div className="flex overflow-hidden space-x-4">
        {products.slice(currentIndex, currentIndex + 3).map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex-shrink-0 w-1/3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="w-full h-64 relative mb-4 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {product.title}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              ${product.price}
            </p>
            <Button className="bg-shop-primary hover:bg-shop-primary/90 text-white w-full">
              View Product
            </Button>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-900 bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75"
        onClick={prev}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </div>

      {/* Right Arrow */}
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-900 bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75"
        onClick={next}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export default Carousel;
