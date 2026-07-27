"use client";

import { useMemo, useState } from "react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import { useBag } from "@/src/lib/hooks/useBag";

import type { Product } from "@/src/data/products";
import type { ProductInventory } from "@/src/data/inventory";

interface ProductAcquisitionProps {
  product: Product;
  inventory?: ProductInventory;
}

export default function ProductAcquisition({
  product,
  inventory,
}: ProductAcquisitionProps) {
  const { addToBag } = useBag();

  const [selectedSize, setSelectedSize] =
    useState<string | null>(null);

  const sizes = useMemo(
    () =>
      inventory?.sizes ??
      product.sizes.map((size) => ({
        size,
        stock: 1,
      })),
    [inventory, product.sizes]
  );

  const canAcquire =
    selectedSize !== null &&
    inventory?.status !== "coming-soon" &&
    inventory?.status !== "sold-out";

  function handleAcquire() {
  console.log("Acquire clicked");

  if (!selectedSize) {
    return;
  }

  console.log("Adding to bag...", selectedSize);

  addToBag({
    productSlug: product.slug,
    size: selectedSize,
    quantity: 1,
  });
}

  return (
    <Section customPadding="py-45">
      <Container>
        <div className="border-t border-white/10 pt-20">
          <p
            className="
              mt-10
              font-mono
              text-[11px]
              uppercase
              tracking-[0.4em]
              text-white/40
            "
          >
            Current Edition
          </p>

          <h2
            className="
              mt-6
              text-[clamp(3rem,7vw,6rem)]
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.05em]
            "
          >
            {product.name}
          </h2>

          <p
            className="
              my-10
              text-xl
              font-medium
              text-white/65
            "
          >
            {product.price}
          </p>

          <p
            className="
              my-6
              font-mono
              text-[11px]
              uppercase
              tracking-[0.4em]
              text-white/40
            "
          >
            Select Size
          </p>

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-4
            "
          >
            {sizes.map(({ size, stock }) => {
              const isSelected =
                selectedSize === size;

              const isDisabled =
                stock === 0;

                

              return (
                
                <button
                  key={size}
                  type="button"
                  disabled={isDisabled}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={`
                    border
                    px-10
                    py-4
                    font-mono
                    text-xs
                    uppercase
                    tracking-[0.45em]
                    transition-all
                    duration-300

                    ${
                      isDisabled
                        ? "cursor-not-allowed border-white/5 text-white/20"
                        : isSelected
                        ? "border-white bg-white text-black"
                        : "border-white/10 text-white/70 hover:border-white/40 hover:text-white"
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
            
          <button
            type="button"
            disabled={!canAcquire}
            onClick={handleAcquire}
            className={`
              mt-20
              inline-flex
              items-center
              gap-4
              border-b
              pb-3
              font-mono
              text-[11px]
              uppercase
              tracking-[0.45em]
              transition-all
              duration-300

              ${
                canAcquire
                ? "border-white/20 text-white/80 hover:gap-6 hover:border-white/60 hover:text-white"
                  : "cursor-not-allowed border-white/10 text-white/25"
              }
            `}
          >
            {selectedSize
              ? "Acquire Piece"
              : "Select Size"}

            {selectedSize && (
              <span aria-hidden>→</span>
            )}
          </button>
        </div>
      </Container>
    </Section>
  );
}