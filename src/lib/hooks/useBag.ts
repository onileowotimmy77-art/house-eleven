"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getBag,
  initializeBag,
  addToBag as addItem,
  removeFromBag as removeItem,
  updateBagQuantity as updateQuantity,
  clearBag as clearItems,
} from "@/src/lib/commerce/bag/bag";

import type { BagItem } from "@/src/lib/commerce/bag/types";

export function useBag() {
  const [items, setItems] = useState<BagItem[]>([]);

  const refresh = useCallback(() => {
    setItems([...getBag().items]);
  }, []);

  useEffect(() => {
    initializeBag();
    refresh();
  }, [refresh]);

  const addToBag = useCallback(
    (item: BagItem) => {
      addItem(item);
      refresh();
    },
    [refresh]
  );

  const removeFromBag = useCallback(
    (productSlug: string, size: string) => {
      removeItem(productSlug, size);
      refresh();
    },
    [refresh]
  );

  const updateBagQuantity = useCallback(
    (
      productSlug: string,
      size: string,
      quantity: number
    ) => {
      updateQuantity(
        productSlug,
        size,
        quantity
      );

      refresh();
    },
    [refresh]
  );

  const clearBag = useCallback(() => {
    clearItems();
    refresh();
  }, [refresh]);

  return {
    items,
    addToBag,
    removeFromBag,
    updateBagQuantity,
    clearBag,
  };
}