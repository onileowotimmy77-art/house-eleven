"use client";

import { useMemo } from "react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import CommerceSummary from "@/src/features/commerce/CommerceSummary";

import { useBagStore } from "@/src/lib/stores/useBagStore";

import { getProduct } from "@/src/data/getProduct";

interface BagSummarySectionProps {
  children: React.ReactNode;
}

export default function BagSummarySection({
  children,
}: BagSummarySectionProps) {
  const items = useBagStore((state) => state.items);

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

  const shipping = 0;

  const total = subtotal + shipping;

  return (
    <Section customPadding="pb-56">
      <Container>
        <div
          className="
            grid
            gap-20
            lg:grid-cols-[minmax(0,2fr)_420px]
            lg:items-start
          "
        >
          <div>{children}</div>

          <div className="lg:sticky lg:top-32">
            <CommerceSummary
  subtotal={subtotal}
  shipping={shipping}
  total={total}
  cta={
    items.length > 0
      ? "Proceed to Checkout"
      : "Explore Collections"
  }
  href={
    items.length > 0
      ? "/checkout"
      : "/collections"
  }
/>
          </div>
        </div>
      </Container>
    </Section>
  );
}