import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./provider";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";
import { Suspense } from "react"; // 👈 import Suspense
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Footer from "@/components/layout/Footer";

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
           <ClerkProvider>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div>Loading Navbar...</div>}>
              <Navbar />
            </Suspense>
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer/>
          </div>
          <Toaster position="bottom-right" />
        </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
