"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types"; // Assuming you have a 'Product' type defined
import { getProducts } from "@/services/api"; // Your API fetching logic
import Carousel from "@/components/products/Carousel"; // Import Carousel component

const QualityProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-12 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Quality Products You Can Trust
      </h1>

      {/* Section: Why Our Products are Quality */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Why Choose Our Products?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Cards */}
          {[
            {
              title: "Durability",
              description:
                "Our products are built to last, made with the highest quality materials for long-lasting durability.",
            },
            {
              title: "Carefully Sourced",
              description:
                "We source only the best materials, ensuring that every product meets the highest standards of quality.",
            },
            {
              title: "Customer Satisfaction",
              description:
                "We stand behind our products with a satisfaction guarantee, ensuring you're always happy with your purchase.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-shop-primary/5 dark:hover:bg-shop-primary/10"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Featured Products */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Featured Quality Products
        </h2>
        <div className="flex justify-center">
          {/* Display loading state or carousel */}
          {loading ? (
            <p className="text-center text-gray-700 dark:text-gray-300">Loading products...</p>
          ) : (
            <Carousel products={products} />
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-shop-primary/10 dark:bg-shop-primary/20 p-8 rounded-lg text-center shadow-lg transition-all duration-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Ready to Explore More Quality Products?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          We have a wide range of products to meet your needs. Check out our full catalog today!
        </p>
        <Button size="lg" asChild className="bg-shop-primary hover:bg-shop-primary/90 text-white">
          <Link href="/products">Shop All Products</Link>
        </Button>
      </section>
    </div>
  );
};

export default QualityProductsPage;
