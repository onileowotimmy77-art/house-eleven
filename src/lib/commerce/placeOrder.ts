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
   * Web Locks gives every House Eleven
   * tab on the same origin an exclusive
   * inventory-claim section.
   *
   * This prevents two tabs from both
   * claiming the final piece at the
   * same time.
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
      const inventory =
        useInventoryStore.getState();

      /*
       * Re-check and claim the ENTIRE
       * bag while holding the lock.
       *
       * If even one item is unavailable,
       * claimInventory() changes nothing.
       */
      const claimed =
        inventory.claimInventory(
          bag.items
        );

      if (!claimed) {
        return null;
      }

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