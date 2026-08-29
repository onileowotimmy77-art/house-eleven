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
    index: number,
    inventory: ProductInventory[]
  ) => boolean;

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
  index,
  inventory
) => {
  const state = get();

  const productInventory =
    inventory.find(
      (product) =>
        product.productSlug ===
        item.productSlug
    );

  const sizeInventory =
    productInventory?.sizes.find(
      (size) =>
        size.size === item.size
    );

  /*
   * Undo is only allowed when the
   * exact product and size currently
   * have enough live stock to restore
   * the requested quantity.
   */
  if (
    !sizeInventory ||
    sizeInventory.stock < item.quantity
  ) {
    return false;
  }

  const existingIndex =
    state.items.findIndex(
      (bagItem) =>
        bagItem.productSlug ===
          item.productSlug &&
        bagItem.size ===
          item.size
    );

  /*
   * If the same product/size has
   * already been added back to the Bag,
   * restore the requested quantity onto
   * that existing line.
   */
  if (existingIndex !== -1) {
    const existingItem =
      state.items[existingIndex];

    const nextQuantity =
      existingItem.quantity +
      item.quantity;

    if (
      nextQuantity >
      sizeInventory.stock
    ) {
      return false;
    }

    set({
      items:
        state.items.map(
          (bagItem, currentIndex) =>
            currentIndex ===
            existingIndex
              ? {
                  ...bagItem,
                  quantity:
                    nextQuantity,
                }
              : bagItem
        ),
    });

    return true;
  }

  /*
   * Reinsert the removed piece at
   * its original position.
   */
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

  set({
    items:
      restoredItems,
  });

  return true;
},

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
    const currentItem =
      state.items.find(
        (item) =>
          item.productSlug ===
            productSlug &&
          item.size ===
            size
      );

    if (!currentItem) {
      return state;
    }

    /*
     * Decreasing quantity is always allowed.
     *
     * The customer is relinquishing inventory,
     * so current live stock must never prevent
     * them from reducing their selection.
     */
    if (
      quantity <
      currentItem.quantity
    ) {
      if (quantity <= 0) {
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
    }

    /*
     * Increasing quantity is an acquisition,
     * so live inventory must allow it.
     */
    if (
      quantity >
      currentItem.quantity
    ) {
      if (
        !canAcquireQuantity(
          productSlug,
          size,
          quantity
        )
      ) {
        return state;
      }
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
                     * If the product or size no
                     * longer exists in live inventory,
                     * remove it from the bag.
                     *
                     * The notice is deliberately
                     * created at the same moment as
                     * the removal so the two states
                     * cannot become disconnected.
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
                    * The customer's complete
                     * requested quantity is still
                     * available.
                     */
                    if (
                      item.quantity <=
                      sizeInventory.stock
                    ) {
                      return item;
                    }

                    /*
                     * Some stock remains, but not
                     * enough to satisfy the original
                     * quantity.
                     *
                     * Reduce the bag to the maximum
                     * quantity currently available.
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

              /*
               * The inventory notice represents a
               * meaningful change to the customer's
               * selection.
               *
               * Keep it in the Bag store until the
               * customer explicitly dismisses it.
               */
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

            /*
             * A completely cleared bag should not
             * retain a previous inventory warning.
             */
            inventoryNotice:
              null,
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
         * Persist both the Bag contents and the
         * inventory notice.
         *
         * The notice is part of the customer's
         * selection-change state: if checkout
         * discovers that a piece is no longer
         * available, the customer must still be
         * informed when they return to Bag.
         *
         * The notice is removed explicitly by
         * clearInventoryNotice().
         */
        partialize: (
          state
        ) => ({
          items:
            state.items,

          inventoryNotice:
            state.inventoryNotice,
        }),
      }
    )
  );