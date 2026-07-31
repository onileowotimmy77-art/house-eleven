"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BagItem {
  productSlug: string;
  size: string;
  quantity: number;
}

interface BagStore {
  items: BagItem[];

  addToBag: (
    item: BagItem
  ) => void;

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

        addToBag: (item) =>
          set((state) => {
            const existing =
              state.items.find(
                (bagItem) =>
                  bagItem.productSlug ===
                    item.productSlug &&
                  bagItem.size ===
                    item.size
              );

            if (existing) {
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
                              bagItem.quantity +
                              item.quantity,
                          }
                        : bagItem
                  ),
              };
            }

            return {
              items: [
                ...state.items,
                item,
              ],
            };
          }),

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

            if (existingIndex !== -1) {
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
                              bagItem.quantity +
                              item.quantity,
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
              items: restoredItems,
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
                    item.size === size
                  )
              ),
          })),

        updateQuantity: (
          productSlug,
          size,
          quantity
        ) =>
          set((state) => ({
            items:
              quantity <= 0
                ? state.items.filter(
                    (item) =>
                      !(
                        item.productSlug ===
                          productSlug &&
                        item.size ===
                          size
                      )
                  )
                : state.items.map(
                  