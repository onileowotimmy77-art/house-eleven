"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Reveal from "@/components/motion/Reveal";

import CommerceButton from "@/src/features/commerce/CommerceButton";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import ReviewItems from "./ReviewItems";
import ReviewTotals from "./ReviewTotals";

import { useBagStore } from "@/src/lib/stores/useBagStore";
import { placeOrder } from "@/src/lib/commerce/placeOrder";

import { getProduct } from "@/src/data/getProduct";

export default function CheckoutReview() {
  const router = useRouter();

  const items = useBagStore((state) => state.items);

  const [
  inventoryError,
  setInventoryError,
] = useState(false);

  const [
  isSubmitting,
  setIsSubmitting,
] = useState(false);

  const reviewItems = useMemo(() => {
    return items
      .map((item) => {
        const product = getProduct(item.productSlug);

        if (!product) {
          return null;
        }

        return {
          id: `${item.productSlug}-${item.size}`,
          name: product.name,
          color: product.color,
          size: item.size,
          quantity: item.quantity,
          price: product.price,
        };
      })
      .filter(
        (
          item
        ): item is {
          id: string;
          name: string;
          color: string;
          size: string;
          quantity: number;
          price: string;
        } => item !== null
      );
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      const product = getProduct(item.productSlug);

      if (!product) {
        return total;
      }

      return (
        total +
        product.priceValue * item.quantity
      );
    }, 0);
  }, [items]);

  const total = subtotal;

  async function handleConfirmOrder() {
  if (isSubmitting) {
    return;
  }

  if (items.length === 0) {
    router.push("/bag");
    return;
  }

  setInventoryError(false);
  setIsSubmitting(true);

  const order = await placeOrder();

  if (!order) {
    setInventoryError(true);
    setIsSubmitting(false);
    return;
  }

  router.push("/checkout/confirmation");
}

  return (
    <section className="py-40">
      <Reveal>
        <Eyebrow>
          Chapter IV
        </Eyebrow>

        <Display className="mt-8">
          Review
        </Display>

        <Body
          className="
            mt-8
            max-w-2xl
          "
        >
          Take one final look before your order begins its journey.
        </Body>
      </Reveal>

      <div className="mt-24">
        <ReviewItems
          items={reviewItems}
        />

        <ReviewTotals
          subtotal={`₦${new Intl.NumberFormat("en-NG").format(subtotal)}`}
          shipping="Calculated at checkout"
          total={`₦${new Intl.NumberFormat("en-NG").format(total)}`}
        />

        {inventoryError && (
  <div
    className="
      mt-16
      border
      border-white/10
      bg-white/[0.03]
      px-6
      py-5
    "
  >
    <p
      className="
        font-mono
        text-[10px]
        uppercase
        tracking-[0.35em]
        text-white/45
      "
    >
      Selection Updated
    </p>

    <p
      className="
        mt-3
        text-sm
        leading-relaxed
        text-white/70
      "
    >
      One or more pieces in your
      selection are no longer
      available in the requested
      quantity. Return to your Bag
      to review the current
      availability.
    </p>

    <button
      type="button"
      onClick={() =>
        router.push("/bag")
      }
      className="
        mt-6
        border-b
        border-white/15
        pb-2
        font-mono
        text-[10px]
        uppercase
        tracking-[0.35em]
        text-white/65
        transition-colors
        duration-300
        hover:border-white/50
        hover:text-white
      "
    >
      Return to Bag
    </button>
  </div>
)}

<CommerceButton
  onClick={handleConfirmOrder}
  disabled={isSubmitting}
  className="mt-20 w-full"
>
  {isSubmitting
    ? "Confirming Order"
    : "Confirm Order"}
</CommerceButton>
      </div>
    </section>
  );
}