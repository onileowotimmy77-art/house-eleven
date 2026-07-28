"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import AcquisitionCard from "@/src/features/commerce/AcquisitionCard";
import { useBagStore } from "@/src/lib/stores/useBagStore";
import type { Product } from "@/src/data/products";
import type { ProductInventory } from "@/src/data/inventory";
import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";



interface ProductAcquisitionProps {
  product: Product;
  inventory?: ProductInventory;
}

export default function ProductAcquisition({
  product,
  inventory,
}: ProductAcquisitionProps) {
  const addToBag = useBagStore(
    (state) => state.addToBag
  );

  

  const [selectedSize, setSelectedSize] =
    useState<string | null>(null);

  const [showCard, setShowCard] =
    useState(false);

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

  useEffect(() => {
    if (!showCard) {
      return;
    }

    const timer = setTimeout(() => {
      setShowCard(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showCard]);

  const availability = useMemo(() => {
  switch (inventory?.status) {
    case "available":
      return {
        label: "Available",
        className: "text-white/55",
      };

    case "low-stock":
      return {
        label: "Only a few pieces remain.",
        className: "text-white/70",
      };

    case "coming-soon":
      return {
        label: "Chapter I has not yet opened.",
        className: "text-white/45",
      };

    case "sold-out":
      return {
        label: "This edition has been fully acquired.",
        className: "text-white/45",
      };

    default:
      return {
        label: "",
        className: "text-white/45",
      };
  }
}, [inventory]);

  function handleAcquire() {
    if (!selectedSize) {
      return;
    }

    addToBag({
      productSlug: product.slug,
      size: selectedSize,
      quantity: 1,
    });

    setShowCard(true);
  }

  return (
    <>
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
  className={`
    font-mono
    text-[11px]
    uppercase
    tracking-[0.35em]
    ${availability.className}
  `}
>
  {availability.label}
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
              disabled={
  inventory?.status === "coming-soon" ||
  inventory?.status === "sold-out"
    ? false
    : !canAcquire
}
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
              {
  inventory?.status === "coming-soon"
    ? "Coming Soon"

    : inventory?.status === "sold-out"
    ? "Notify Me"

    : selectedSize
    ? "Acquire Piece"

    : "Select Size"
}

              {inventory?.status === "available" ||
inventory?.status === "low-stock" ? (
  selectedSize && (
    <span aria-hidden>→</span>
  )
) : null}
            </button>
          </div>
        </Container>
      </Section>

      <AcquisitionCard
        open={showCard}
        image={product.bagImage}
        name={product.name}
        size={selectedSize ?? ""}
        price={product.price}
      />
    </>
  );
}