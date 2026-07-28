import { useBagStore } from "@/src/lib/stores/useBagStore";
import { useInventoryStore } from "@/src/lib/stores/useInventoryStore";

export function placeOrder() {
  const bag = useBagStore.getState();
  const inventory = useInventoryStore.getState();

  for (const item of bag.items) {
    inventory.decreaseStock(
      item.productSlug,
      item.size,
      item.quantity
    );
  }

  bag.clearBag();
}