"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { getProducts, getCategories } from '@/services/api';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (!products.length) return;
    
    let result = [...products];

    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'title-asc':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-desc':
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, searchQuery]);

  return (
    <>
      <ProductFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchQuery={searchQuery}
      />
      
      <ProductGrid 
        products={filteredProducts} 
        isLoading={isProductsLoading || isCategoriesLoading} 
      />
    </>
  );
}
