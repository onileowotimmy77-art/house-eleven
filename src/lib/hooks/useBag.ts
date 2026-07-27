"use client";

import { useBagContext } from "@/src/lib/commerce/bag/BagProvider";

export function useBag() {
  return useBagContext();
}