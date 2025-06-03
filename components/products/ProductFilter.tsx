"use client";

import React, { useEffect } from "react";
import { ChevronDown, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  searchQuery?: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  searchQuery = "",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync UI changes with URL query parameters
  useEffect(() => {
    // Compose new URL search params on filter change
    const params = new URLSearchParams();

    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (sortBy) params.set("sort", sortBy);

    // Push updated URL (without full reload)
    router.replace(`/products?${params.toString()}`, { scroll: false });
  }, [selectedCategory, sortBy, searchQuery, router]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSortBy("");
    // Navigate to products without query params
    router.push("/products");
  };

  const sortOptions = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "title-asc", label: "Name: A-Z" },
    { value: "title-desc", label: "Name: Z-A" },
  ];

  const hasActiveFilters = selectedCategory || sortBy || searchQuery;

  return (
    <div className="mb-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Products</h2>

        <div className="flex flex-wrap items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Clear filters
              <X size={14} className="ml-1" />
            </Button>
          )}

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {selectedCategory || "All Categories"}
                  <ChevronDown size={14} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 dark:bg-gray-900 dark:border-gray-700">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => setSelectedCategory("")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    All Products
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 capitalize"
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] h-9 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {searchQuery && (
        <div className="mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit text-gray-800 dark:text-gray-100">
            <Search size={14} />
            <span className="text-sm">Search: {searchQuery}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
