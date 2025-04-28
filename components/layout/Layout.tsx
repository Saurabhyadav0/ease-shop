"use client"; // Important if using Toaster, Zustand, etc. in the client-side

import React from 'react';
import { Navbar } from './Navbar';
import { Toaster } from '@/components/ui/sonner'; // ✅ Next.js supports @ imports if set in tsconfig.json

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
