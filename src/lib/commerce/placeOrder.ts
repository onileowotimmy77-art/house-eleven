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

function createOrderNumber() {
  const year =
    new Date().getFullYear();

  const reference =
    crypto
      .randomUUID()
      .slice(0, 8)
      .toUpperCase();

  return `HE-${year}-${reference};
}

export function placeOrder() {
  const bag =
    useBagStore.getState();

  const inventory =
    useInventoryStore.getState();

  const orderStore =
    useOrderStore.getState();

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

  const order = {
    id: crypto.randomUUID(),

    orderNumber:
      createOrderNumber(),

    items: bag.items.map(
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

    paymentMethod:
      "Debit / Credit Card",

    estimatedDelivery:
      "3–5 Business Days",

    createdAt:
      new Date().toISOString(),
  };

  orderStore.createOrder(
    order
  );

  for (
    const item of bag.items
  ) {
    inventory.decreaseStock(
      item.productSlug,
      item.size,
      item.quantity
    );
  }

  bag.clearBag();

  return order;
}