import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./provider";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";
import { Suspense } from "react"; // 👈 import Suspense

export const metadata: Metadata = {
  title: "ShopEase - Your Online Store",
  description: "Shop online for the best products with fast delivery",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div>Loading Navbar...</div>}>
              <Navbar />
            </Suspense>
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-white border-t py-6">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
              </div>
            </footer>
          </div>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
