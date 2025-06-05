import React, { Suspense } from "react";
import OrderSuccessPageClient from "./order-sucessclientpage";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <OrderSuccessPageClient />
    </Suspense>
  );
}
