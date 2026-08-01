"use client";

import {
  useEffect,
  useState,
} from "react";

import AccountLayout from "@/src/features/account/AccountLayout";
import EmptyOrders from "@/src/features/account/EmptyOrders";
import OrderCard from "@/src/features/account/OrderCard";

import { useOrderStore } from "@/src/lib/stores/useOrderStore";

export default function OrdersPage() {
  const orders = useOrderStore(
    (state) => state.orders
  );

  const [hasHydrated, setHasHydrated] =
    useState(false);

  useEffect(() => {
    setHasHydrated(
      useOrderStore.persist.hasHydrated()
    );

    const unsubscribe =
      useOrderStore.persist.onFinishHydration(
        () => {
          setHasHydrated(true);
        }
      );

    return unsubscribe;
  }, []);

  if (!hasHydrated) {
    return null;
  }

  return (
    <AccountLayout
      title="Orders"
      description="Track every Residence from confirmation to delivery."
    >
      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="space-y-2">
          {orders.map((order) => {
            const formattedTotal =
              new Intl.NumberFormat(
                "en-NG"
              ).format(
                order.total
              );

            const formattedDate =
              new Intl.DateTimeFormat(
                "en-NG",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              ).format(
                new Date(
                  order.createdAt
                )
              );

            return (
              <OrderCard
                key={
                  order.orderNumber
                }
                orderNumber={
                  order.orderNumber
                }
                placedOn={
                  formattedDate
                }
                status={
                  order.status
                }
                total={
                  `₦${formattedTotal}`
                }
                href={
                  `/account/orders/${order.orderNumber}`
                }
              />
            );
          })}
        </div>
      )}
    </AccountLayout>
  );
}  