import type { Bag 

const bag: Bag = {
  items: [],
};

/**
 * Returns the current bag.
 */
export function getBag(): Bag {
  return bag;
}

/**
 * Adds a product to the bag.
 * If the same product and size already exist,
 * its quantity is increased instead.
 */
export function addToBag(item: BagItem): void {
  const existingItem = bag.items.find(
    (bagItem) =>
      bagItem.productSlug === item.productSlug &&
      bagItem.size === item.size
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
    return;
  }

  bag.items.push(item);
}

/**
 * Removes a product/size combination completely.
 */
export function removeFromBag(
  productSlug: string,
  size: string
): void {
  bag.items = bag.items.filter(
    (item) =>
      !(
        item.productSlug === productSlug &&
        item.size === size
      )
  );
}

/**
 * Updates the quantity of a bag item.
 * Quantities less than or equal to zero remove the item.
 */
export function updateBagQuantity(
  productSlug: string,
  size: string,
  quantity: number
): void {
  if (quantity <= 0) {
    removeFromBag(productSlug, size);
    return;
  }

  const item = bag.items.find(
    (bagItem) =>
      bagItem.productSlug === productSlug &&
      bagItem.size === size
  );

  if (!item) {
    return;
  }

  item.quantity = quantity;
}

/**
 * Removes every item from the bag.
 */
export function clearBag(): void {
  bag.items = [];
}