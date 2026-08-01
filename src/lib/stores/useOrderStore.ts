"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  productSlug: string;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;

  orderNumber: string;

  items: OrderItem[];

  subtotal: number;

  total: number;

  paymentMethod: string;

  estimatedDelivery: string;

  createdAt: string;
}

interface OrderStore {
  latestOrder: Order | null;

  createOrder: (
    order: Order
  ) => void;

  clearLatestOrder: () => void;
}

export const useOrderStore =
  create<OrderStore>()(
    persist(
      (set) => ({
        latestOrder: null,

        createOrder: (
          order
        ) =>
          set({
            latestOrder: order,
          }),

        clearLatestOrder: () =>
          set({
            latestOrder: null,
          }),
      }),
      {
        name: "house-eleven-order",
      }
    )
  );