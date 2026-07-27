"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  initializeBag,
  getBag,
  addToBag as addItem,
  removeFromBag as removeItem,
  updateBagQuantity as updateQuantity,
  clearBag as clearItems,
} from "./bag";

import type { BagItem } from "./types";

interface BagContextValue {
  items: BagItem[];

  addToBag: (item: BagItem) => void;

  removeFromBag: (
    productSlug: string,
    size: string
  ) => void;

  updateBagQuantity: (
    productSlug: string,
    size: string,
    quantity: number
  ) => void;

  clearBag: () => void;
}

const BagContext =
  createContext<BagContextValue | null>(null);

export function BagProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
    (
      productSlug: string,
      size: string
    ) => {
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

  return (
    <BagContext.Provider
      value={{
        items,
        addToBag,
        removeFromBag,
        updateBagQuantity,
        clearBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBagContext() {
  const context = useContext(BagContext);

  if (!context) {
    throw new Error(
      "useBagContext must be used inside BagProvider."
    );
  }

  return context;
}