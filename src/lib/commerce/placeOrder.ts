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
  getLiveInventory,
} from "@/src/lib/supabase/inventory";

import type {
  OrderStatus,
} from "@/src/lib/stores/useOrderStore";

export type CheckoutPaymentMethod =
  | "card"
  | "bank";

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

function getPaymentMethodLabel(
  paymentMethod: CheckoutPaymentMethod
) {
  return paymentMethod === "card"
    ? "Debit / Credit Card"
    : "Bank Transfer";
}

export async function placeOrder(
  paymentMethod: CheckoutPaymentMethod
) {
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
   * Resolve the UI payment method
   * into the value stored by the order.
   */
  const selectedPaymentMethod =
    getPaymentMethodLabel(
      paymentMethod
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
       * PostgreSQL performs the
       * complete checkout transaction.
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
              selectedPaymentMethod,

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

        /*
         * The database rejected the
         * checkout. Refresh the bag against
         * the latest inventory before the
         * customer returns to Bag.
         */
        try {
          const liveInventory =
            await getLiveInventory();

          useBagStore
            .getState()
            .reconcileWithInventory(
              useInventoryStore
                .getState()
                .inventory.map(
                  (product) => {
                    const liveProduct =
                      liveInventory.filter(
                        (row) =>
                          row.product_slug ===
                          product.productSlug
                      );
                      const sizes =
                      product.sizes.map(
                        (size) => ({
                          size:
                            size.size,

                          stock:
                            liveProduct.find(
                              (row) =>
                                row.size ===
                                size.size
                            )?.stock ?? 0,
                        })
                      );

                    return {
                      ...product,
                      sizes,
                    };
                  }
                )
            );
        } catch (
          reconciliationError
        ) {
          console.error(
            "House Eleven inventory reconciliation failed:",
            reconciliationError
          );
        }

        return null;
      }

      /*
       * Inventory was unavailable or
       * PostgreSQL rejected the checkout.
       *
       * Reconcile the bag using the latest
       * database inventory.
       */
      if (!checkoutSucceeded) {
        try {
          const liveInventory =
            await getLiveInventory();

          useBagStore
            .getState()
            .reconcileWithInventory(
              useInventoryStore
                .getState()
                .inventory.map(
                  (product) => {
                    const liveProduct =
                      liveInventory.filter(
                        (row) =>
                          row.product_slug ===
                          product.productSlug
                      );

                    const sizes =
                      product.sizes.map(
                        (size) => ({
                          size:
                            size.size,

                          stock:
                            liveProduct.find(
                              (row) =>
                                row.size ===
                                size.size
                            )?.stock ?? 0,
                        })
                      );

                    return {
                      ...product,
                      sizes,
                    };
                  }
                )
            );
        } catch (
          reconciliationError
        ) {
          console.error(
            "House Eleven inventory reconciliation failed:",
            reconciliationError
          );
        }

        return null;
      }

      /*
       * Inventory was successfully claimed.
       */
      const inventoryStore =
        useInventoryStore.getState();

      await inventoryStore
        .hydrateInventory();

      /*
       * Mirror the successfully-created
       * database order into the local
       * Zustand order store.
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
          selectedPaymentMethod,

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
       * successful checkout.
       */
      bag.clearBag();

      return order;
    }
  );
}