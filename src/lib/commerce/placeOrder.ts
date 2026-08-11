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

import {
  validateBagInventory,
} from "@/src/lib/commerce/validateBagInventory";

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

export function placeOrder() {
  const bag =
    useBagStore.getState();

  const inventory =
    useInventoryStore.getState();

  const orderStore =
    useOrderStore.getState();

  /*
   * Never create an order
   * from an empty bag.
   */
  if (bag.items.length === 0) {
    return null;
  }

  /*
   * Final inventory validation.
   *
   * placeOrder() must protect
   * itself even if called from
   * somewhere other than checkout.
   */
  const validation =
    validateBagInventory(
      bag.items
    );

  if (!validation.valid) {
    return null;
  }

  /*
   * Resolve every product before
   * changing inventory.
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
   * Decrease inventory only after
   * the complete bag has passed
   * validation.
   */
  for (
    const item of bag.items
  ) {
    inventory.decreaseStock(
      item.productSlug,
      item.size,
      item.quantity
    );
  }

  /*
   * Create the order only after
   * inventory has been successfully
   * processed.
   */
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
   * the order has been created.
   */
  bag.clearBag();

  return order;
}