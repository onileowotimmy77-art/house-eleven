"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Produ }
import {
  canAcquireQuantity,
} from "../commerce/inventory";

export interface BagItem {
  productSlug: string;
  size: string;
  quantity: number;
}

interface BagStore {
  items: BagItem[];

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

  clearBag: () => void;

  totalItems: () => number;
}

export const useBagStore =
  create<BagStore>()(
    persist(
      (set, get) => ({
        items: [],

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
      }
    )
  );