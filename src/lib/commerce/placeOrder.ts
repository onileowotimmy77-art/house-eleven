import { getProduct } from "@/src/data/getProduct";

import {
  useBagStore,
} from "@/src/lib/stores/useBagStore";

import {
  useInventoryStore,
} from "@/src/lib/stores/useInventoryStore";

import {
  useOrderStore,
} from "@/src/lib/stores/useOrderStore";

import {
  claimOrderInventory,
} from "@/src/lib/supabase/inventory";

import type {
  OrderStatus,
} from "@/src/lib/stores/useOrderStore";

function createOrderNumber() {
  const year =
    new Date().getFullYear();

  const reference =
    crypto
      .randomUUID()
      .slice(0, 8)
      .toUpperCase();

  return `HE-${year}-${reference}`;
}

export async function placeOrder() {
  const bag =
    useBagStore.getState();

  /*
   * Never create an order
   * from an empty bag.
   */
  if (bag.items.length === 0) {
    return null;
  }

  /*
   * Resolve products before
   * attempting the inventory claim.
   */
  const products =
    bag.items.map((item) => ({
      item,
      product:
        getProduct(
          item.productSlug
        ),
    }));

  if (
    products.some(
      ({ product }) =>
        !product
    )
  ) {
    return null;
  }

  /*
   * Calculate the authoritative
   * order total from product data.
   */
  const subtotal =
    products.reduce(
      (
        total,
        { item, product }
      ) =>
        total +
        product!.priceValue *
          item.quantity,
      0
    );

  /*
   * Web Locks prevents multiple
   * House Eleven tabs from attempting
   * the checkout operation simultaneously
   * on the same browser.
   *
   * PostgreSQL remains the authoritative
   * inventory authority.
   */
  if (
    typeof navigator ===
      "undefined" ||
    !("locks" in navigator)
  ) {
    return null;
  }

  return navigator.locks.request(
    "house-eleven-inventory-claim",
    async () => {
      /*
       * PostgreSQL performs the actual
       * atomic inventory claim.
       *
       * The database either claims the
       * entire bag or changes nothing.
       */
      const claimed =
        await claimOrderInventory(
          bag.items.map(
            (item) => ({
              productSlug:
                item.productSlug,

              size:
                item.size,

              quantity:
                item.quantity,
            })
          )
        );

      if (!claimed) {
        return null;
      }

      /*
       * Refresh the local inventory
       * representation after the
       * successful database claim.
       */
      const inventoryStore =
        useInventoryStore.getState();

      await inventoryStore
        .hydrateInventory();

      /*
       * Inventory has now been claimed
       * successfully.
       *
       * Only after that do we create
       * the order.
       */
      const orderStore =
        useOrderStore.getState();

      const order = {
        id:
          crypto.randomUUID(),

        orderNumber:
          createOrderNumber(),

        items:
          bag.items.map(
            (item) => ({
              productSlug:
                item.productSlug,

              size:
                item.size,

              quantity:
                item.quantity,
            })
          ),

        subtotal,

        total: subtotal,

        status:
          "Preparing Garments" as OrderStatus,

        paymentMethod:
          "Debit / Credit Card",

        estimatedDelivery:
          "3-5 Business Days",

        createdAt:
          new Date().toISOString(),
      };

      orderStore.createOrder(
        order
      );

      /*
       * Clear the bag only after
       * the order exists.
       */
      bag.clearBag();

      return order;
    }
  );
}