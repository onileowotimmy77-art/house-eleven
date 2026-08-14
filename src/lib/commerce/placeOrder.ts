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
  createCheckoutOrder,
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
   * Resolve every product before
   * attempting checkout.
   *
   * Product data remains the source
   * for the authoritative price.
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
   * House Eleven tabs in the same
   * browser from attempting checkout
   * simultaneously.
   *
   * PostgreSQL remains the ultimate
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
    "house-eleven-checkout",
    async () => {
      /*
       * Generate the order identity
       * before calling PostgreSQL.
       */
      const orderId =
        crypto.randomUUID();

      const orderNumber =
        createOrderNumber();

      const orderItems =
        bag.items.map(
          (item) => ({
            productSlug:
              item.productSlug,

            size:
              item.size,

            quantity:
              item.quantity,
          })
        );

      /*
       * PostgreSQL now performs the
       * complete checkout transaction:
       *
       * 1. Validate the request.
       * 2. Verify inventory.
       * 3. Claim inventory.
       * 4. Create the order.
       * 5. Create order items.
       * 6. Commit everything together.
       *
       * If anything fails, PostgreSQL
       * rolls the transaction back.
       */
      let checkoutSucceeded: boolean;

      try {
        checkoutSucceeded =
          await createCheckoutOrder({
            orderId,

            orderNumber,

            total:
              subtotal,

            paymentMethod:
              "Debit / Credit Card",

            estimatedDelivery:
              "3-5 Business Days",

            items:
              orderItems,
          });
      } catch (error) {
        console.error(
          "House Eleven checkout failed:",
          error
        );

        return null;
      }

      /*
       * Inventory was unavailable or
       * PostgreSQL rejected the checkout.
       */
      if (!checkoutSucceeded) {
        return null;
      }

      /*
       * Refresh the local inventory
       * representation after the
       * successful database transaction.
       */
      const inventoryStore =
        useInventoryStore.getState();

      /*
       * hydrateInventory() intentionally
       * does not re-fetch once the store
       * has already loaded.
       *
       * Realtime will normally deliver
       * the database update, so we do not
       * rely on hydration for checkout
       * correctness.
       */
      await inventoryStore
        .hydrateInventory();

      /*
       * Mirror the successfully-created
       * database order into the local
       * Zustand order store.
       *
       * * The database remains the
       * authoritative checkout record.
       */
      const orderStore =
        useOrderStore.getState();

      const order = {
        id:
          orderId,

        orderNumber:
          orderNumber,

        items:
          orderItems,

        total:
          subtotal,

        status:
          "Order Confirmed" as OrderStatus,

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
       * Clear the local bag only after
       * the database transaction and
       * local order creation both succeed.
       */
      bag.clearBag();

      return order;
    }
  );
}