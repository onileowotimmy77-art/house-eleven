"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ProductInventory } from "@/src/data/inventory";

import {
  canAcquireQuantity,
} from "../commerce/inventory";

export interface BagItem {
  productSlug: string;
  size: string;
  quantity: number;
}

export interface BagInventoryNotice {
  productSlug: string;
  size: string;
  previousQuantity: number;
  currentQuantity: number;
  reason:
    | "unavailable"
    | "reduced";
}

interface BagStore {
  items: BagItem[];

  inventoryNotice:
    | BagInventoryNotice
    | null;

  addToBag: (
    item: BagItem
  ) => boolean;

  restoreToBag: (
    item: BagItem,
    index: number
  ) => void;

  removeFromBag: (
    productSlug: string,
    size: string
  ) => void;

  updateQuantity: (
    productSlug: string,
    size: string,
    quantity: number
  ) => void;

  reconcileWithInventory: (
    inventory: ProductInventory[]
  ) => void;

  clearInventoryNotice: () => void;

  clearBag: () => void;

  totalItems: () => number;
}

export const useBagStore =
  create<BagStore>()(
    persist(
      (set, get) => ({
        items: [],

        inventoryNotice: null,

        addToBag: (
          item
        ) => {
          const state =
            get();

          const existing =
            state.items.find(
              (bagItem) =>
                bagItem.productSlug ===
                  item.productSlug &&
                bagItem.size ===
                  item.size
            );

          const nextQuantity =
            existing
              ? existing.quantity +
                item.quantity
              : item.quantity;

          if (
            !canAcquireQuantity(
              item.productSlug,
              item.size,
              nextQuantity
            )
          ) {
            return false;
          }

          set((currentState) => {
            if (existing) {
              return {
                items:
                  currentState.items.map(
                    (bagItem) =>
                      bagItem.productSlug ===
                        item.productSlug &&
                      bagItem.size ===
                        item.size
                        ? {
                            ...bagItem,
                            quantity:
                              nextQuantity,
                          }
                        : bagItem
                  ),
              };
            }

            return {
              items: [
                ...currentState.items,
                item,
              ],
            };
          });

          return true;
        },

        restoreToBag: (
          item,
          index
        ) =>
          set((state) => {
            const existingIndex =
              state.items.findIndex(
                (bagItem) =>
                  bagItem.productSlug ===
                    item.productSlug &&
                  bagItem.size ===
                    item.size
              );

            const nextQuantity =
              existingIndex !== -1
                ? state.items[
                    existingIndex
                  ].quantity +
                  item.quantity
                : item.quantity;

            if (
              !canAcquireQuantity(
                item.productSlug,
                item.size,
                nextQuantity
              )
            ) {
              return state;
            }

            if (
              existingIndex !== -1
            ) {
              return {
                items:
                  state.items.map(
                    (bagItem) =>
                      bagItem.productSlug ===
                        item.productSlug &&
                      bagItem.size ===
                        item.size
                        ? {
                            ...bagItem,
                            quantity:
                              nextQuantity,
                          }
                        : bagItem
                  ),
              };
            }
            const restoredItems = [
              ...state.items,
            ];

            const safeIndex =
              Math.max(
                0,
                Math.min(
                  index,
                  restoredItems.length
                )
              );

            restoredItems.splice(
              safeIndex,
              0,
              item
            );

            return {
              items:
                restoredItems,
            };
          }),

        removeFromBag: (
          productSlug,
          size
        ) =>
          set((state) => ({
            items:
              state.items.filter(
                (item) =>
                  !(
                    item.productSlug ===
                      productSlug &&
                    item.size ===
                      size
                  )
              ),
          })),

        updateQuantity: (
          productSlug,
          size,
          quantity
        ) =>
          set((state) => {
            if (
              quantity <= 0
            ) {
              return {
                items:
                  state.items.filter(
                    (item) =>
                      !(
                        item.productSlug ===
                          productSlug &&
                        item.size ===
                          size
                      )
                  ),
              };
            }

            if (
              !canAcquireQuantity(
                productSlug,
                size,
                quantity
              )
            ) {
              return state;
            }

            return {
              items:
                state.items.map(
                  (item) =>
                    item.productSlug ===
                      productSlug &&
                    item.size ===
                      size
                      ? {
                          ...item,
                          quantity,
                        }
                      : item
                ),
            };
          }),

        reconcileWithInventory:
          (inventory) =>
            set((state) => {
              let nextNotice:
                | BagInventoryNotice
                | null = null;

              const reconciledItems =
                state.items
                  .map((item) => {
                    const productInventory =
                      inventory.find(
                        (product) =>
                          product.productSlug ===
                          item.productSlug
                      );

                    const sizeInventory =
                      productInventory?.sizes.find(
                        (size) =>
                          size.size ===
                          item.size
                      );

                    /*
                     * If the product or size no longer
                     * exists in live inventory, remove it.
                     */
                    if (
                      !sizeInventory ||
                      sizeInventory.stock <= 0
                    ) {
                      if (
                        !nextNotice
                      ) {
                        nextNotice = {
                          productSlug:
                            item.productSlug,
                          size:
                            item.size,
                          previousQuantity:
                            item.quantity,
                          currentQuantity:
                            0,
                          reason:
                            "unavailable",
                        };
                      }

                      return null;
                    }

                    /*
                     * The requested quantity is still
                     * fully available.
                     */
                    if (
                      item.quantity <=
                      sizeInventory.stock
                    ) {
                      return item;
                      }

                    /*
                     * Some stock remains, but less than
                     * the requested quantity.
                     *
                     * Reduce the bag quantity to the
                     * maximum currently available.
                     */
                    if (
                      !nextNotice
                    ) {
                      nextNotice = {
                        productSlug:
                          item.productSlug,
                        size:
                          item.size,
                        previousQuantity:
                          item.quantity,
                        currentQuantity:
                          sizeInventory.stock,
                        reason:
                          "reduced",
                      };
                    }

                    return {
                      ...item,
                      quantity:
                        sizeInventory.stock,
                    };
                  })
                  .filter(
                    (
                      item
                    ): item is BagItem =>
                      item !== null
                  );

              return {
                items:
                  reconciledItems,

                inventoryNotice:
                  nextNotice,
              };
            }),

        clearInventoryNotice:
          () =>
            set({
              inventoryNotice:
                null,
            }),

        clearBag: () =>
          set({
            items: [],
          }),

        totalItems: () =>
          get()
            .items
            .reduce(
              (
                total,
                item
              ) =>
                total +
                item.quantity,
              0
            ),
      }),
      {
        name:
          "house-eleven-bag",

        skipHydration: true,

        /*
         * Only the actual Bag contents are
         * persisted.
         *
         * Inventory notices are temporary UI
         * state and must never survive a browser
         * restart or become part of the Bag data.
         */
        partialize: (
          state
        ) => ({
          items:
            state.items,
        }),
      }
    )
  );