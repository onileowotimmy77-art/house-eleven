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

import type {
  BagItem,
} from "@/src/lib/stores/useBagStore";

const initialInventory: ProductInventory[] =
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
  inventory: ProductInventory[];

  decreaseStock: (
    productSlug: string,
    size: string,
    quantity?: number
  ) => void;

  claimInventory: (
    items: BagItem[]
  ) => boolean;

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

        /*
         * Legacy single-item inventory
         * mutation.
         *
         * Kept for existing callers,
         * but order placement should
         * use claimInventory().
         */
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
                        (
                          inventorySize
                        ) =>
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
          }),

        /*
         * Atomically claim every item
         * required by an order.
         *
         * The complete bag must be
         * available before ANY stock
         * is changed.
         */
        claimInventory: (
          items
        ) => {
          let claimed = false;

          set((state) => {
            /*
             * Aggregate quantities first.
             *
             * This prevents duplicate bag
             * entries from bypassing the
             * inventory check.
             */
            const requested =
            new Map<
                string,
                number
              >();

            for (const item of items) {
              const key =
                `${item.productSlug}::${item.size}`;

              requested.set(
                key,
                (requested.get(key) ?? 0) +
                  item.quantity
              );
            }

            /*
             * Validate the entire request
             * against the current state.
             */
            for (
              const [
                key,
                quantity,
              ] of requested
            ) {
              const [
                productSlug,
                size,
              ] = key.split("::");

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
                sizeInventory.stock <
                  quantity
              ) {
                return state;
              }
            }

            /*
             * Everything is available.
             *
             * Only now mutate inventory.
             */
            const updatedInventory =
              state.inventory.map(
                (product) => {
                  const updatedSizes =
                    product.sizes.map(
                      (sizeInventory) => {
                        const key =
                          ${product.productSlug}::${sizeInventory.size};

                        const quantity =
                          requested.get(
                            key
                          ) ?? 0;

                        if (
                          quantity <= 0
                        ) {
                          return sizeInventory;
                        }

                        return {
                          ...sizeInventory,

                          stock:
                            sizeInventory.stock -
                            quantity,
                        };
                      }
                    );

                  return {
                    ...product,

                    sizes:
                      updatedSizes,

                    status:
                      getInventoryStatus(
                        updatedSizes
                      ),
                  };
                }
              );

            claimed = true;

            return {
              inventory:
                updatedInventory,
            };
          });

          return claimed;
        },
      }),
      {
        name:
          "house-eleven-inventory",

        skipHydration: true,
      }
    )
  );