"use client";

import {
  useEffect,
  type ReactNode,
} from "react";

import { useBagStore } from "@/src/lib/stores/useBagStore";
import { useInventoryStore } from "@/src/lib/stores/useInventoryStore";
import { useOrderStore } from "@/src/lib/stores/useOrderStore";
import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";
import { useRestockStore } from "@/src/lib/stores/useRestockStore";
import { useEarlyAccessStore } from "@/src/lib/stores/useEarlyAccessStore";

interface StoreSyncProviderProps {
  children: ReactNode;
}

const stores = [
  useBagStore,
  useInventoryStore,
  useOrderStore,
  useSavedPiecesStore,
  useRestockStore,
  useEarlyAccessStore,
];

const storageKeys = new Map<string, typeof stores[number]>([
  [
    "house-eleven-bag",
    useBagStore,
  ],
  [
    "house-eleven-inventory",
    useInventoryStore,
  ],
  [
    "house-eleven-orders",
    useOrderStore,
  ],
  [
    "house-eleven-saved-pieces",
    useSavedPiecesStore,
  ],
  [
    "house-eleven-restock",
    useRestockStore,
  ],
  [
    "house-eleven-early-access",
    useEarlyAccessStore,
  ],
]);

export default function StoreSyncProvider({
  children,
}: StoreSyncProviderProps) {
  useEffect(() => {
    /*
     * Initial hydration.
     *
     * This intentionally happens after the first
     * client render so the server and client render
     * the same initial Zustand state.
     */
    stores.forEach((store) => {
      if (!store.persist.hasHydrated()) {
        void store.persist.rehydrate();
      }
    });

    /*
     * Cross-tab synchronization.
     *
     * The browser fires a storage event in every
     * other tab when localStorage changes.
     */
    function handleStorage(event: StorageEvent) {
      if (!event.key) {
        stores.forEach((store) => {
          void store.persist.rehydrate();
        });

        return;
      }

      const store = storageKeys.get(event.key);

      if (!store) {
        return;
      }

      void store.persist.rehydrate();
    }

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  return children;
}