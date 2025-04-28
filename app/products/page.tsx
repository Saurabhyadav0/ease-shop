import { Suspense } from "react";
import ProductsClient from '@/components/products/ProductsClient';

export default function ProductsPage() {
  return (
    <main className="p-6">
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsClient />
      </Suspense>
    </main>
  );
}
