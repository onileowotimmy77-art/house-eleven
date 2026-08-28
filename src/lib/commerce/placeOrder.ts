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

import type {
  ProductInventory,
} from "@/src/data/inventory";

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

/*
 * Build a fresh ProductInventory
 * representation from the latest
 * Supabase inventory rows.
 *
 * The existing product structure remains
 * the source of truth for known products
 * and sizes. Supabase becomes the source
 * of truth for the current stock values.
 */
function mergeLiveInventory(
  currentInventory: ProductInventory[],
  liveRows: Awaited<
    ReturnType<typeof getLiveInventory>
  >
): ProductInventory[] {
  return currentInventory.map(
    (product) => {
      const sizes =
        product.sizes.map(
          (size) => {
            const liveRow =
              liveRows.find(
                (row) =>
                  row.product_slug ===
                    product.productSlug &&
                  row.size ===
                    size.size
              );

            return {
              ...size,

              /*
               * A known product/size that
               * does not exist in the live
               * result is treated as zero
               * stock.
               */
              stock:
                liveRow?.stock ?? 0,
            };
          }
        );

      return {
        ...product,

        sizes,

        /*
         * Keep the existing product status
         * here temporarily. The bag
         * reconciliation only needs size
         * stock, while the inventory store's
         * normal hydration/realtime path
         * remains responsible for statuses.
         */
      };
    }
  );
}

/*
 * Reconcile the customer's bag against
 * the latest inventory returned directly
 * from Supabase.
 *
 * This function deliberately does not
 * modify the bag if the live inventory
 * request fails.
 */
async function reconcileBagWithLiveInventory() {
  try {
    const liveInventory =
      await getLiveInventory();

    const inventoryStore =
      useInventoryStore.getState();

    const mergedInventory =
      mergeLiveInventory(
        inventoryStore.inventory,
        liveInventory
      );

    /*
     * Update the client inventory store
     * immediately so the Bag and any other
     * inventory-aware UI reflect the same
     * live stock used for reconciliation.
     */
    useInventoryStore.setState({
      inventory:
        mergedInventory,
      hasLoaded:
        true,
      isLoading:
        false,
    });

    /*
     * Reconcile only after the live
     * inventory has been successfully
     * obtained.
     */
    useBagStore
      .getState()
      .reconcileWithInventory(
        mergedInventory
      );

    return true;
  } catch (error) {
    /*
     * If live inventory cannot be fetched,
     * leave the customer's bag untouched.
     *
     * This is safer than interpreting a
     * failed inventory request as zero stock.
     */
    console.error(
      "House Eleven inventory reconciliation failed:",
      error
    );

    return false;
  }
}

export async function placeOrder(
  paymentMethod: CheckoutPaymentMethod
) {
  /*
   * Read the bag at the moment checkout
   * begins.
   */
  const initialBag =
    useBagStore.getState();

  /*
   * Never create an order from an
   * empty bag.
   */
  if (
    initialBag.items.length === 0
    ) {
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
    initialBag.items.map(
      (item) => ({
        item,

        product:
          getProduct(
            item.productSlug
          ),
      })
    );

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
       * Read the bag again inside the lock.
       *
       * This prevents us from using a stale
       * bag snapshot if the bag changed
       * between the initial checkout request
       * and acquisition of the browser lock.
       */
      const bag =
        useBagStore.getState();

        const subtotal =
  bag.items.reduce(
    (total, item) => {
      const product =
        getProduct(
          item.productSlug
        );

      if (!product) {
        return total;
      }

      return (
        total +
        product.priceValue *
          item.quantity
      );
    },
    0
  );

      if (
        bag.items.length === 0
      ) {
        return null;
      }

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
      let checkoutSucceeded:
        boolean;

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
         * transaction.
         *
         * Refresh inventory and reconcile
         * the bag against the actual database
         * state.
         *
         * No bag clearing occurs here.
         */
        await reconcileBagWithLiveInventory();

        return null;
      }

      /*
       * PostgreSQL returned false.
       *
       * This means checkout did not complete,
       * most importantly because one or more
       * requested inventory quantities were
       * unavailable.
       *
       * Refresh inventory and reconcile the
       * bag against the actual database state.
       *
       * No bag clearing occurs here.
       */
      if (!checkoutSucceeded) {
        await reconcileBagWithLiveInventory();

        return null;
      }

      /*
       * Inventory was successfully claimed.
       *
       * The database transaction has now
       * created the order and order items.
       */

      /*
       * Refresh the client inventory state.
       *
       * We intentionally do not rely on
       * hydrateInventory() here because that
       * function correctly prevents redundant
       * hydration once the store has already
       * loaded. The successful checkout has
       * already been authorized by PostgreSQL,
       * * so the local inventory should instead
       * be synchronized directly.
       */
      try {
        const liveInventory =
          await getLiveInventory();

        const inventoryStore =
          useInventoryStore.getState();

        const mergedInventory =
          mergeLiveInventory(
            inventoryStore.inventory,
            liveInventory
          );

        useInventoryStore.setState({
          inventory:
            mergedInventory,

          hasLoaded:
            true,

          isLoading:
            false,
        });
      } catch (inventoryError) {
        /*
         * The order has already been
         * successfully created.
         *
         * Failure to refresh the local
         * inventory must not turn a successful
         * order into a failed checkout.
         */
        console.error(
          "House Eleven inventory refresh after successful checkout failed:",
          inventoryError
        );
      }

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
       * Clear the local bag ONLY after
       * PostgreSQL has successfully completed
       * the checkout transaction and the local
       * order has been created.
       */
      useBagStore
        .getState()
        .clearBag();

      return order;
    }
  );
}