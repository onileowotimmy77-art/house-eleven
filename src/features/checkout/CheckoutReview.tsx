"use client";

import { useMemo } from "react";

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

import { getProduct } from "@/src/data/getProduct";







export default function CheckoutReview() {
  const items = useBagStore((state) => state.items);

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

        <CommerceButton
          href="/checkout/confirmation"
          className="mt-20 w-full"
        >
          Confirm Order
        </CommerceButton>
      </div>
    </section>
  );
}