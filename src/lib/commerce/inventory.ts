import {
  useInventoryStore,
} from "@/src/lib/stores/useInventoryStore";

export function getProductInventory(
  productSlug: string
) {
  return useInventoryStore
    .getState()
    .getInventory(productSlug);
}

export function getSizeStock(
  productSlug: string,
  size: string
): number {
  const productInventory =
    getProductInventory(
      productSlug
    );

  if (!productInventory) {
    return 0;
  }

  const sizeInventory =
    productInventory.sizes.find(
      (item) =>
        item.size === size
    );

  return (
    sizeInventory?.stock ?? 0
  );
}

export function isProductAvailable(
  productSlug: string
): boolean {
  const productInventory =
    getProductInventory(
      productSlug
    );

  if (!productInventory) {
    return false;
  }

  return (
    productInventory.status ===
      "available" ||
    productInventory.status ===
      "low-stock"
  );
}

export function canAcquireQuantity(
  productSlug: string,
  size: string,
  quantity: number
): boolean {
  if (
    !isProductAvailable(
      productSlug
    )
  ) {
    return false;
  }

  const stock =
    getSizeStock(
      productSlug,
      size
    );

  return (
    quantity > 0 &&
    quantity <= stock
  );
}