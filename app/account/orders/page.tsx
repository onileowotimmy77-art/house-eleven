"use client";

import AccountLayout from "@/components/account/AccountLayout";
import OrderCard from "@/components/account/OrderCard";

export default function OrdersPage() {
  return (
    <AccountLayout
      title="Orders"
      description="Track every Residence from confirmation to delivery."
    >
      <div className="space-y-16">

        <div className="space-y-2">

  <OrderCard
    orderNumber="#HE-2026-001284"
    placedOn="July 21, 2026"
    status="Preparing Garments"
    total="₦190,000"
    href="/account/orders/HE-2026-001284"
  />

  <OrderCard
    orderNumber="#HE-2026-001102"
    placedOn="June 18, 2026"
    status="Delivered"
    total="₦145,000"
    href="/account/orders/HE-2026-001102"
  />

</div>
      </div>
    </AccountLayout>
  );
}