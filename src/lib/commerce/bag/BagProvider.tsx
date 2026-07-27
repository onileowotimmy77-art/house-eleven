"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState, 
} from "react";

import {
  getBag,
  initializeBag,
  addToBag as addItem,
  removeFromBag as removeItem,
  updateBagQuantity as updateQuantity,
  clearBag as clearItems,
} from "./bag";

import type { BagItem } from "./types";

interface BagContextType {
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
  createContext<BagContextType | null>(null);

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

  const value = useMemo(
    () => ({
      items,
      addToBag,
      removeFromBag,
      updateBagQuantity,
      clearBag,
    }),
    [
      items,
      addToBag,
      removeFromBag,
      updateBagQuantity,
      clearBag,
    ]
  );

  return (
    <BagContext.Provider value={value}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);

  if (!context) {
    throw new Error(
      "useBag must be used inside BagProvider."
    );
  }

  return context;
}