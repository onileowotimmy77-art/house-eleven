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
import { useInventoryStore } from "@/src/lib/stores/useInventoryStore";

import type { Product } from "@/src/data/products";
import type { ProductInventory } from "@/src/data/inventory";

import { canAcquireQuantity } from "@/src/lib/commerce/inventory";

interface ProductAcquisitionProps {
  product: Product;
  inventory?: ProductInventory;
}

type CommerceNotificationType =
  | "acquired"
  | "saved"
  | "removed"
  | "restock"
  | "early-access"
  | "unavailable";

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

  const hasRequestedRestock = useRestockStore(
    (state) =>
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
    useEarlyAccessStore(
      (state) =>
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

  const isSaved = useSavedPiecesStore(
    (state) =>
      state.isSaved(product.slug)
  );

  /*
   * Live inventory.
   *
   * This subscribes the acquisition UI directly
   * to the synchronized Zustand inventory store.
   *
   * The server-provided inventory remains available
   * as the initial fallback.
   */
  const liveInventory =
    useInventoryStore((state) =>
      state.inventory.find(
        (item) =>
          item.productSlug ===
          product.slug
      )
    );

  const [selectedSize, setSelectedSize] =
    useState<string | null>(null);

  const [
    notification,
    setNotification,
  ] =
    useState<CommerceNotificationType | null>(
      null
    );

  /*
   * Use live inventory whenever it exists.
   *
   * The prop remains as a safe initial fallback.
   */
  const currentInventory =
    liveInventory ?? inventory;

  const sizes = useMemo(
    () =>
      currentInventory?.sizes ??
      product.sizes.map((size) => ({
        size,
        stock: 1,
      })),
    [
      currentInventory,
      product.sizes,
    ]
  );

  const inventoryStatus =
    currentInventory?.status;

  const canAcquire =
    selectedSize !== null &&
    inventoryStatus !== "coming-soon" &&
    inventoryStatus !== "sold-out";

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        setNotification(null);
      },
      3000
    );

    return () =>
      window.clearTimeout(timer);
  }, [notification]);

  /*
   * If the currently selected size becomes
   * unavailable in another tab, clear the
   * selection so the UI cannot continue with
   * stale availability.
   */
  useEffect(() => {
    if (!selectedSize) {
      return;
    }

    const selectedInventory =
      sizes.find(
        (item) =>
          item.size === selectedSize
      );

    if (
      !selectedInventory ||
      selectedInventory.stock <= 0
    ) {
      setSelectedSize(null);
    }
  }, [
    selectedSize,
    sizes,
  ]);

  const availability = useMemo(() => {
    switch (inventoryStatus) {
      case "available":
        return {
          label: "Available",
          className: "text-white/55",
        };

      case "low-stock":
        return {
          label:
          "Only a few pieces remain.",
          className: "text-white/70",
        };

      case "coming-soon":
        return {
          label:
            "Chapter I has not yet opened.",
          className: "text-white/45",
        };

      case "sold-out":
        return {
          label:
            "This edition has been fully acquired.",
          className: "text-white/45",
        };

      default:
        return {
          label: "",
          className: "text-white/45",
        };
    }
  }, [inventoryStatus]);

  function handleSavePiece() {
    if (isSaved) {
      removePiece(product.slug);

      setNotification("removed");

      return;
    }

    savePiece(product.slug);

    setNotification("saved");
  }

  function handleRestockRequest() {
    requestRestock(product.slug);

    setNotification("restock");
  }

  function handleEarlyAccessRequest() {
    requestEarlyAccess(product.slug);

    setNotification("early-access");
  }

  function handleAcquire() {
    if (
      inventoryStatus ===
      "sold-out"
    ) {
      handleRestockRequest();

      return;
    }

    if (
      !selectedSize ||
      inventoryStatus ===
        "coming-soon"
    ) {
      return;
    }

    /*
     * Read the current live inventory at the
     * exact moment of acquisition.
     *
     * This protects against a UI that became
     * stale between render and click.
     */
    const latestInventory =
      useInventoryStore
        .getState()
        .inventory.find(
          (item) =>
            item.productSlug ===
            product.slug
        );

    const selectedSizeInventory =
      latestInventory?.sizes.find(
        (item) =>
          item.size ===
          selectedSize
      );

    if (
      !selectedSizeInventory ||
      selectedSizeInventory.stock <= 0
    ) {
      setSelectedSize(null);

      setNotification(
        "unavailable"
      );

      return;
    }

    if (
      !canAcquireQuantity(
        product.slug,
        selectedSize,
        1
      )
    ) {
      setNotification(
        "unavailable"
      );

      return;
    }

    const wasAdded =
      addToBag({
        productSlug:
          product.slug,
        size:
          selectedSize,
        quantity: 1,
      });

    if (!wasAdded) {
      setNotification(
        "unavailable"
      );

      return;
    }

    setNotification("acquired");
  }

  const notificationConfig =
    notification === "acquired"
      ? {
          eyebrow: "House Eleven",
          title: product.name,
          subtitle: Size ${selectedSize} • ${product.price},
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
          ctaLabel:
            "View Saved Pieces",
          ctaHref:
            "/account/saved",
        }
      : notification === "removed"
      ? {
          eyebrow: "Saved",
          title: product.name,
          subtitle: product.collection,
          message:
            "Removed from your personal archive.",
        }
      : notification ===
        "early-access"
      ? {
          eyebrow:
            "Early Access",
          title: product.name,
          subtitle:
            product.collection,
          message:
            "Your request has been received. The House will contact you before this edition opens.",
        }
      : notification === "restock"
      ? {
          eyebrow:
            "Restock Requested",
          title: product.name,
          subtitle:
            product.collection,
          message:
            "You will be notified when this piece returns to the House.",
        }
      : notification ===
        "unavailable"
      ? {
          eyebrow:
            "Selection Updated",
          title: product.name,
          subtitle:
            selectedSize
            