"use client";

import { create } from "zustand";

import {
  inventory as seedInventory,
  type ProductInventory,
} from "@/src/data/inventory";

import {
  getInventoryStatus,
} from "@/src/lib/commerce/getInventoryStatus";

import {
  getLiveInventory,
  type SupabaseInventoryRow,
} from "@/src/lib/supabase/inventory";

import type {
  BagItem,
} from "@/src/lib/stores/useBagStore";

interface InventoryStore {
  inventory: ProductInventory[];

  isLoading: boolean;

  hasLoaded: boolean;

  hydrateInventory: () => Promise<void>;

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

function buildInventory(
  rows: SupabaseInventoryRow[]
): ProductInventory[] {
  return seedInventory.map(
    (seedProduct) => {
      const productRows =
        rows.filter(
          (row) =>
            row.product_slug ===
            seedProduct.productSlug
        );

      const sizes =
        seedProduct.sizes.map(
          (seedSize) => {
            const databaseSize =
              productRows.find(
                (row) =>
                  row.size ===
                  seedSize.size
              );

            return {
              size: seedSize.size,

              stock:
                databaseSize?.stock ??
                0,
            };
          }
        );

      return {
        ...seedProduct,

        sizes,

        status:
          getInventoryStatus(
            sizes
          ),
      };
    }
  );
}

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

export const useInventoryStore =
  create<InventoryStore>()(
    (set, get) => ({
      inventory:
        initialInventory,

      isLoading: false,

      hasLoaded: false,

      hydrateInventory:
        async () => {
          if (
            get().isLoading ||
            get().hasLoaded
          ) {
            return;
          }

          set({
            isLoading: true,
          });

          try {
            const rows =
              await getLiveInventory();

            const liveInventory =
              buildInventory(
                rows
              );

            set({
              inventory:
                liveInventory,

              isLoading: false,

              hasLoaded: true,
            });
          } catch (error) {
            console.error(
              "Failed to hydrate inventory:",
              error
            );

            set({
              isLoading: false,
            });
          }
        },

      getInventory:
        (productSlug) =>
          get()
            .inventory
            .find(
              (product) =>
                product.productSlug ===
                productSlug
            ),

      /*
       * Temporary local mutation.
       *
       * The production checkout flow
       * will eventually use an atomic
       * Supabase inventory claim instead.
       */
      decreaseStock:
        (
          productSlug,
          size,
          quantity = 1
        ) =>
          set((state) => {
            if (
              quantity <= 0
            ) {
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
                  item.size ===
                  size
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

                      sizes:
                        updatedSizes,

                      status:
                        getInventoryStatus(
                          updatedSizes
                        ),
                    };
                  }
                ),
            };
          }),

      /*
       * Temporary client-side claim.
       *
       * This remains here so existing
       * callers continue compiling.
       *
       * We will replace the actual
       * checkout authority with a
       * Supabase atomic operation.
       */
      claimInventory:
        (items) => {
          let claimed = false;

          set((state) => {
            const requested =
              new Map<
                string,
                number
              >();

            for (
              const item of items
            ) {
              const key =
                `${item.productSlug}::${item.size}`;

              requested.set(
                key,
                (requested.get(
                  key
                ) ?? 0) +
                  item.quantity
              );
            }

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
                    item.size ===
                    size
                );

              if (
                !sizeInventory ||
                sizeInventory.stock <
                  quantity
              ) {
                return state;
              }
            }

            const updatedInventory =
              state.inventory.map(
                (product) => {
                  const updatedSizes =
                    product.sizes.map(
                      (
                        sizeInventory
                      ) => {
                        const key =
                          `${product.productSlug}::${sizeInventory.size}`;

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
    })
  );