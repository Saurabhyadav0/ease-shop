import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, Headset, ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <div className="py-12 space-y-20">
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-8 py-6">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Discover Amazing Products at Great Prices
          </h1>
          <p className="text-lg text-gray-600">
            Shop our curated collection of high-quality items. From electronics to fashion, we've got everything you need.
          </p>
          <div className="pt-4">
            <Button size="lg" asChild className="bg-shop-primary hover:bg-shop-primary/90">
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
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ShopEase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Fast Shipping */}
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-shop-primary/5">
            <div className="w-16 h-16 bg-shop-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-shop-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-600">Get your products delivered quickly to your doorstep.</p>
          </div>

          {/* Quality Products */}
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-shop-primary/5">
            <div className="w-16 h-16 bg-shop-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-shop-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">We ensure all products meet high quality standards.</p>
          </div>

          {/* 24/7 Support */}
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-shop-primary/5">
            <div className="w-16 h-16 bg-shop-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headset className="w-8 h-8 text-shop-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our customer support is always available to help you.</p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-shop-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start shopping?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Browse our wide selection of products and find exactly what you're looking for!
        </p>
        <Button size="lg" asChild className="bg-shop-primary hover:bg-shop-primary/90">
          <Link href="/products">Shop All Products</Link>
        </Button>
      </section>

    </div>
  );
}
