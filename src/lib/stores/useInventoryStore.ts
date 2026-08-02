"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  inventory as seedInventory,
  type ProductInventory,
} from "@/src/data/inventory";

import {
  getInventoryStatus,
} from "@/src/lib/commerce/getInventoryStatus";

const initialInventory:
  ProductInventory[] =
  seedInventory.map(
    (product) => ({
      ...product,

      sizes:
        product.sizes.map(
          (size) => ({
            ...size,
          })
        ),

      status:
        getInventoryStatus(
          product.sizes
        ),
    })
  );

interface InventoryStore {
  inventory:
    ProductInventory[];

  decreaseStock: (
    productSlug: string,
    size: string,
    quantity?: number
  ) => void;

  getInventory: (
    productSlug: string
  ) =>
    | ProductInventory
    | undefined;
}

export const useInventoryStore =
  create<InventoryStore>()(
    persist(
      (set, get) => ({
        inventory:
          initialInventory,

        getInventory: (
          productSlug
        ) =>
          get()
            .inventory
            .find(
              (product) =>
                product.productSlug ===
                productSlug
            ),

        decreaseStock: (
  productSlug,
  size,
  quantity = 1
) =>
  set((state) => {
    if (quantity <= 0) {
      return state;
    }

    const product =
      state.inventory.find(
        (item) =>
          item.productSlug ===
          productSlug
      );

    if (!product) {
      return state;
    }

    const sizeInventory =
      product.sizes.find(
        (item) =>
          item.size === size
      );

    if (
      !sizeInventory ||
      quantity >
        sizeInventory.stock
    ) {
      return state;
    }

    return {
      inventory:
        state.inventory.map(
          (item) => {
            if (
              item.productSlug !==
              productSlug
            ) {
              return item;
            }

            const updatedSizes =
              item.sizes.map(
                (inventorySize) =>
                  inventorySize.size ===
                  size
                    ? {
                        ...inventorySize,

                        stock:
                          inventorySize.stock -
                          quantity,
                      }
                    : inventorySize
              );

            return {
              ...item,

              status:
                getInventoryStatus(
                  updatedSizes
                ),

              sizes:
                updatedSizes,
            };
          }
        ),
    };
  })),

      {
        name:
          "house-eleven-inventory",
      }
    )
  );