"use client";

import React from 'react';
import { Navbar } from './Navbar';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <p className="text-right text-gray-800 dark:text-gray-200">
            Made with <span className="text-red-500">❤️</span> by Saurabh
          </p>
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Layout;
