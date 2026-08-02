"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import CommerceNotification from "../../commerce/CommerceNotification";

import { useBagStore } from "@/src/lib/stores/useBagStore";
import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";
import { useRestockStore } from "@/src/lib/stores/useRestockStore";
import { useEarlyAccessStore } from "@/src/lib/stores/useEarlyAccessStore";

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
  const addToBag = useBagStore(
    (state) => state.addToBag
  );

  const requestRestock = useRestockStore(
  (state) => state.requestRestock
);

const hasRequestedRestock =
  useRestockStore((state) =>
    state.hasRequestedRestock(
      product.slug
    )
  );

  const requestEarlyAccess =
  useEarlyAccessStore(
    (state) =>
      state.requestEarlyAccess
  );

const hasRequestedEarlyAccess =
  useEarlyAccessStore((state) =>
    state.hasRequestedEarlyAccess(
      product.slug
    )
  );

  const savePiece = useSavedPiecesStore(
    (state) => state.savePiece
  );

  const removePiece = useSavedPiecesStore(
    (state) => state.removePiece
  );

  const isSaved = useSavedPiecesStore((state) =>
    state.isSaved(product.slug)
  );

  const [selectedSize, setSelectedSize] =
    useState<string | null>(null);

  type CommerceNotificationType =
  | "acquired"
  | "saved"
  | "removed"
  | "restock"
  | "early-access"
  | "unavailable";

const [notification, setNotification] =
  useState<CommerceNotificationType | null>(null);

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
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

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

  function handleSavePiece() {
    if (isSaved) {
      removePiece(product.slug);
      return;
    }

    savePiece(product.slug);

    setNotification("saved");
  }

  function handleRestockRequest() {
  requestRestock(
    product.slug
  );

  setNotification("restock");
}

function handleEarlyAccessRequest() {
  requestEarlyAccess(
    product.slug
  );

  setNotification("early-access");
}

  function handleAcquire() {
  if (
    inventory?.status ===
    "sold-out"
  ) {
    handleRestockRequest();

    return;
  }

  if (
    !selectedSize ||
    inventory?.status ===
      "coming-soon"
  ) {
    return;
  }

  const selectedSizeInventory =
    sizes.find(
      (inventorySize) =>
        inventorySize.size ===
        selectedSize
    );

  if (
    !selectedSizeInventory ||
    selectedSizeInventory.stock <= 0
  ) {
    return;
  }

  const wasAdded =
    addToBag({
      productSlug:
        product.slug,

      size:
        selectedSize,

      quantity:
        1,
    });

  if (!wasAdded) {
  setNotification(
    "unavailable"
  );

  return;
}

  setNotification(
    "acquired"
  );
}

  const notificationConfig =
  notification === "acquired"
    ? {
        eyebrow: "House Eleven",
        title: product.name,
        subtitle: `Size ${selectedSize} • ${product.price}`,
        message:
          "This piece has entered your Residence.",
        ctaLabel: "View Bag",
        ctaHref: "/bag",
      }
    : notification === "saved"
    ? {
        eyebrow: "Saved",
        title: product.name,
        subtitle: product.collection,
        message:
          "Added to your personal archive.",
        ctaLabel: "View Saved Pieces",
        ctaHref: "/account/saved",
      }

      : notification === "early-access"
? {
    eyebrow: "Early Access",
    title: product.name,
    subtitle: product.collection,
    message:
      "Your request has been received. The House will contact you before this edition opens.",
  }

    : notification === "restock"
? {
    eyebrow: "Restock Requested",
    title: product.name,
    subtitle: product.collection,
    message:
      "You will be notified when this piece returns to the House.",
  }
: null;
    
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
                inventory?.status ===
                  "coming-soon" ||
                inventory?.status ===
                  "sold-out"
                  ? false
                  : !canAcquire
              }
              onClick={
  inventory?.status ===
  "coming-soon"
    ? handleEarlyAccessRequest
    : inventory?.status ===
      "sold-out"
    ? handleRestockRequest
    : handleAcquire
}
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
              {inventory?.status ===
"coming-soon"
  ? hasRequestedEarlyAccess
    ? "Early Access Requested"
    : "Request Early Access"
  : inventory?.status ===
    "sold-out"
  ? hasRequestedRestock
    ? "Restock Requested"
    : "Notify Me"
  : selectedSize
  ? "Acquire Piece"
  : "Select Size"}

              {(inventory?.status ===
                "available" ||
                inventory?.status ===
                  "low-stock") &&
                selectedSize && (
                  <span aria-hidden>
                    →
                  </span>
                )}
            </button>

            <button
              type="button"
              onClick={handleSavePiece}
              className="
                mt-8
                block
                font-mono
                text-[11px]
                uppercase
                tracking-[0.45em]
                text-white/40
                transition-colors
                duration-300
                hover:text-white/70
              "
            >
              {isSaved
                ? "Saved ✓"
                : "Save Piece"}
            </button>
          </div>
        </Container>
      </Section>

      {notificationConfig && (
  <CommerceNotification
    open
    image={product.bagImage}
    eyebrow={notificationConfig.eyebrow}
    title={notificationConfig.title}
    subtitle={notificationConfig.subtitle}
    message={notificationConfig.message}
    ctaLabel={notificationConfig.ctaLabel}
    ctaHref={notificationConfig.ctaHref}
    onDismiss={() =>
      setNotification(null)
    }
  />
)}
    </>
  );
}