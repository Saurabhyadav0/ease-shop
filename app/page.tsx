
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="py-12 space-y-12">
      <section className="text-center py-16 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto">
          Welcome to ShopEase - Your One-Stop Shop!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing products at unbeatable prices. We offer a wide range of quality items for every need.
        </p>
        <div>
          <Button size="lg" asChild className="bg-shop-primary hover:bg-shop-primary/90">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <h3 className="text-xl font-bold mb-3">Fast Shipping</h3>
          <p className="text-gray-600">Get your products delivered quickly to your doorstep.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <h3 className="text-xl font-bold mb-3">Quality Products</h3>
          <p className="text-gray-600">We ensure all products meet high quality standards.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
          <p className="text-gray-600">Our customer support is always available to help you.</p>
        </div>
      </section>
    </div>
  );
}
