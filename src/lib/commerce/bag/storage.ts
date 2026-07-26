import type { Bag } from "./types";

const STORAGE_KEY = "house-eleven-bag";

export function getStoredBag(): Bag {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const storedBag = localStorage.getItem(STORAGE_KEY);

    if (!storedBag) {
      return { items: [] };
    }

    return JSON.parse(storedBag) as Bag;
  } catch {
    return { items: [] };
  }
}

export function saveBag(bag: Bag): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(bag)
  );
}

export function clearStoredBag(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}