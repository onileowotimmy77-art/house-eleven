"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { getOrderTimeline } from "@/src/lib/commerce/orderTimeline";

import { useParams } from "next/navigation";

import AccountLayout from "@/src/features/account/AccountLayout";
import OrderStatusTimeline from "@/src/features/account/OrderStatusTimeline";

import {
  Display,
  Body,
} from "@/components/ui/typography";

import { useOrderStore } from "@/src/lib/stores/useOrderStore";

import { getProduct } from "@/src/data/getProduct";

export default function OrderDetailPage() {
  const params = useParams<{
    orderNumber: string;
  }>();

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

  const order = useMemo(
    () =>
      orders.find(
        (currentOrder) =>
          currentOrder.orderNumber ===
          params.orderNumber
      ),
    [
      orders,
      params.orderNumber,
    ]
  );

  if (!hasHydrated) {
    return null;
  }

  if (!order) {
    return (
      <AccountLayout
        title="Order"
        description="This order could not be found."
      >
        <div className="py-24">
          <Display>
            Order Not Found
          </Display>

          <Body className="mt-8 max-w-xl">
            This order is no longer available
            in your account.
          </Body>
        </div>
      </AccountLayout>
    );
  }

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

  const steps = [
    {
      title: "Order Confirmed",
      description:
        "Your order has been received and reserved.",
      complete: true,
    },
    {
      title: "Preparing Garments",
      description:
        "Every selected piece is being prepared.",
      complete:
        order.status ===
          "Preparing Garments" ||
        order.status ===
          "Quality Inspection" ||
        order.status ===
          "Dispatch" ||
        order.status ===
          "Delivered",
    },
    {
      title: "Quality Inspection",
      description:
        "Each garment undergoes final inspection.",
      complete:
        order.status ===
          "Quality Inspection" ||
        order.status ===
          "Dispatch" ||
        order.status ===
          "Delivered",
    },
    {
      title: "Dispatch",
      description:
        "Your Residence begins its journey.",
      complete:
        order.status ===
          "Dispatch" ||
        order.status ===
          "Delivered",
    },
    {
      title: "Delivered",
      description:
        "Your Residence has arrived.",
      complete:
        order.status ===
        "Delivered",
    },
  ];

  return (
    <AccountLayout
      title="Order"
      description={`Placed ${formattedDate}`}
    >
      <section>
        <p
          className="
            font-mono
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-white/40
          "
        >
          {order.orderNumber}
        </p>

        <Display className="mt-6">
          {order.status}
        </Display>

        <Body
          className="
            mt-8
            max-w-2xl
          "
        >
          Your Residence is currently
          moving through the House.
        </Body>
      </section>

      <section
        className="
          mt-24
          border-t
          border-white/10
        "
      >
        <div
          className="
            divide-y
            divide-white/10
          "
        >
          {order.items.map(
            (item) => {
              const product =
              getProduct(
                  item.productSlug
                );

              if (!product) {
                return null;
              }

              return (
                <div
                  key={`${item.productSlug}-${item.size}`}
                  className="
                    flex
                    flex-col
                    gap-4
                    py-8

                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >
                  <div>
                    <h2
                      className="
                        text-xl
                        font-medium
                        tracking-[-0.03em]
                      "
                    >
                      {product.name}
                    </h2>

                    <p
                      className="
                        mt-2
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-white/40
                      "
                    >
                      {product.color}
                      {" · "}
                      Size {item.size}
                      {" · "}
                      Quantity {item.quantity}
                    </p>
                  </div>

                  <p
                    className="
                      text-lg
                      tracking-[-0.02em]
                    "
                  >
                    ₦
                    {new Intl.NumberFormat(
                      "en-NG"
                    ).format(
                      product.priceValue *
                        item.quantity
                    )}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </section>

      <section
        className="
          mt-8
          flex
          flex-col
          gap-4

          border-t
          border-white/10

          py-8

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <span
          className="
            font-mono
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-white/40
          "
        >
          Total
        </span>

        <span
          className="
            text-[1.5rem]
            font-medium
            tracking-[-0.04em]
          "
        >
          ₦{formattedTotal}
        </span>
      </section>

      <OrderStatusTimeline
        steps={steps}
      />
    </AccountLayout>
  );
}