import type { InventoryStatus } from "@/src/data/inventory";
import type { InventorySize } from "@/src/data/inventory";

export function getInventoryStatus(
  sizes: InventorySize[]
): InventoryStatus {
  const totalStock = sizes.reduce(
    (total, size) => total + size.stock,
    0
  );

  if (totalStock === 0) {
    return "sold-out";
  }

  if (totalStock <= 5) {
    return "low-stock";
  }

  return "available";
}