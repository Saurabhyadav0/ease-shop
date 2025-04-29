"use client";
import Link from "next/link";
import Tilt from 'react-parallax-tilt';
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, Headset, ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <div className="py-12 space-y-20">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-8 py-6">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Discover Amazing Products at Great Prices
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Shop our curated collection of high-quality items. From electronics
            to fashion, we&apos;ve got everything you need.
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              asChild
              className="bg-shop-primary hover:bg-shop-primary/90 text-white"
            >
              <Link href="/products" className="flex items-center">
                <ShoppingCart className="mr-2" size={18} />
                Shop Now
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            alt="Shopping"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Why Choose ShopEase?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Cards */}
          {[
            {
              title: "Fast Shipping",
              icon: <Truck className="w-8 h-8 text-shop-primary" />,
              description:
                "Get your products delivered quickly to your doorstep.",
            },
            {
              title: "Quality Products",
              icon: <ShieldCheck className="w-8 h-8 text-shop-primary" />,
              description:
                "We ensure all products meet high quality standards.",
            },
            {
              title: "24/7 Support",
              icon: <Headset className="w-8 h-8 text-shop-primary" />,
              description:
                "Our customer support is always available to help you.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-shop-primary/5 dark:hover:bg-shop-primary/10"
            >
              <div className="w-16 h-16 bg-shop-primary/10 dark:bg-shop-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
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
      <Tilt
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#ffffff"
      glarePosition="all"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      transitionSpeed={1000}
      className="rounded-lg"
    >
      <section className="bg-shop-primary/10 dark:bg-shop-primary/20 rounded-lg p-8 text-center shadow-md dark:shadow-lg transition-all duration-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Ready to start shopping?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Browse our wide selection of products and find exactly what you&apos;re looking for!
        </p>
        <Button size="lg" asChild className="bg-shop-primary hover:bg-shop-primary/90 text-white">
          <Link href="/products">Shop All Products</Link>
        </Button>
      </section>
    </Tilt>
    </div>
  );
}
