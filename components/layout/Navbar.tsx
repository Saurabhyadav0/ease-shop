"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useCartStore from '@/store/useCartStore';
import ToggleButton from '../ToggleButton';

export const Navbar: React.FC = () => {
  const { totalItems } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Ensure searchParams is not null before accessing .get()
    if (searchParams) {
      const currentSearch = searchParams.get('search') || '';
      setSearchQuery(currentSearch);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-shop-primary">
            ShopEase
          </Link>
          
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full py-1.5 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-shop-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-2 text-gray-400" />
              <button type="submit" className="sr-only">Search</button>
            </form>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/products" className="text-gray-600 hover:text-shop-primary">
              Products
            </Link>
            <Link href="/checkout" className="relative">
              <Button variant="ghost" className="relative p-2">
                <ShoppingCart size={22} />
                {totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-shop-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </Button>
            </Link>
            <div><ToggleButton/></div>
          </div>
        </div>
      </div>
    </header>
  );
};
