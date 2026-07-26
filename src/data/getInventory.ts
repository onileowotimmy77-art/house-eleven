import { inventory } from "./inventory";

export function getInventory(productSlug: string) {
  return inventory.find(
    (item) => item.productSlug === productSlug
  );
}