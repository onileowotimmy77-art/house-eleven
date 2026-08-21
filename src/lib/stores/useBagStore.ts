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
            