"use client";

import { create } from "zustand";
import {
  inventory as seedInventory,
  type ProductInventory,
} from "@/src/data/inventory";

import { getInventoryStatus } from "@/src/lib/commerce/getInventoryStatus";



const initialInventory: ProductInventory[] =
  seedInventory.map((product) => ({
    ...product,
    status: getInventoryStatus(product.sizes),
  }));

interface InventoryStore {
  inventory: ProductInventory[];

  decreaseStock: (
    productSlug: string,
    size: string,
    quantity?: number
  ) => void;

  getInventory: (
    productSlug: string
  ) => ProductInventory | undefined;
}

export const useInventoryStore =
  create<InventoryStore>((set, get) => ({
    inventory: initialInventory,

    getInventory: (productSlug) =>
      get().inventory.find(
        (product) =>
          product.productSlug === productSlug
      ),

    decreaseStock: (
      productSlug,
      size,
      quantity = 1
    ) =>
      set((state) => ({
        inventory: state.inventory.map((product) => {
          if (
            product.productSlug !== productSlug
          ) {
            return product;
          }

          const updatedSizes = product.sizes.map(
            (item) =>
              item.size === size
                ? {
                    ...item,
                    stock: Math.max(
                      0,
                      item.stock - quantity
                    ),
                  }
                : item
          );

          return {
            ...product,
            status: getInventoryStatus(
              updatedSizes
            ),
            sizes: updatedSizes,
          };
        }),
      })),
  }));