import { getProduct } from "@/src/data/getProduct";

import {
  useBagStore,
} from "@/src/lib/stores/useBagStore";

import {
  useOrderStore,
} from "@/src/lib/stores/useOrderStore";

import type {
  OrderStatus,
} from "@/src/lib/stores/useOrderStore";

import {
  claimOrderInventory,
} from "@/src/lib/supabase/inventory";

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
   * Convert the complete bag into
   * the payload expected by the
   * atomic Supabase inventory claim.
   */
  const inventoryItems =
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
   * Supabase is now the authoritative
   * inventory authority.
   *
   * The database checks and claims
   * the entire bag atomically.
   *
   * If one item is unavailable,
   * nothing is claimed.
   */
  let claimed: boolean;

  try {
    claimed =
      await claimOrderInventory(
        inventoryItems
      );
  } catch (error) {
    console.error(
      "Inventory claim failed:",
      error
    );

    return null;
  }

  /*
   * Another customer may have
   * acquired one or more pieces
   * before this customer confirmed.
   */
  if (!claimed) {
    return null;
  }

  /*
   * Inventory has now been successfully
   * claimed by Supabase.
   *
   * Only after that do we create
   * the local order record.
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

    total:
      subtotal,

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
   * the order has been created.
   */
  bag.clearBag();

  return order;
}