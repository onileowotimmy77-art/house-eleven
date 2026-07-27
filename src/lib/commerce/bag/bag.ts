import {
  getStoredBag,
  saveBag,
  clearStoredBag,
} from "./storage";

import type { Bag, BagItem } from "./types";

let bag: Bag = {
  items: [],
};

let initialized = false;

/**
 * Loads the bag from localStorage.
 * Safe to call multiple times.
 */

 
export function initializeBag(): void {
  if (initialized) {
    return;
  }

  bag = getStoredBag();
  initialized = true;
}

/**
 * Persists the current bag.
 */
function persist(): void {
  saveBag(bag);
}

/**
 * Returns the current bag.
 */
export function getBag(): Bag {
  initializeBag();

  return bag;
}

/**
 * Adds a product to the bag.
 * If the same product and size already exist,
 * its quantity is increased instead.
 */
export function addToBag(item: BagItem): void {
  initializeBag();

  const existingItem = bag.items.find(
    (bagItem) =>
      bagItem.productSlug === item.productSlug &&
      bagItem.size === item.size
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;

    persist();

    return;
  }

  bag.items.push(item);

  persist();
}

/**
 * Removes a product/size combination completely.
 */
export function removeFromBag(
  productSlug: string,
  size: string
): void {
  initializeBag();

  bag.items = bag.items.filter(
    (item) =>
      !(
        item.productSlug === productSlug &&
        item.size === size
      )
  );

  persist();
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
  initializeBag();

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

  persist();
}

/**
 * Removes every item from the bag.
 */
export function clearBag(): void {
  initializeBag();

  bag.items = [];

  clearStoredBag();
}