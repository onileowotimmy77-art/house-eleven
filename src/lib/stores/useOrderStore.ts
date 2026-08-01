"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus =
  | "Order Confirmed"
  | "Preparing Garments"
  | "Quality Inspection"
  | "Dispatch"
  | "Delivered";

export interface OrderItem {
  productSlug: string;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;

  orderNumber: string;

  items: OrderItem[];

  total: number;

  status: OrderStatus;

  paymentMethod: string;

  estimatedDelivery: string;

  createdAt: string;
}

interface OrderStore {
  orders: Order[];

  latestOrder: Order | null;

  createOrder: (
    order: Order
  ) => void;

  getOrder: (
    orderNumber: string
  ) => Order | undefined;
}

export const useOrderStore =
  create<OrderStore>()(
    persist(
      (set, get) => ({
        orders: [],

        latestOrder: null,

        createOrder: (order) =>
          set((state) => ({
            orders: [
              order,
              ...state.orders,
            ],

            latestOrder: order,
          })),

        getOrder: (orderNumber) =>
          get().orders.find(
            (order) =>
              order.orderNumber ===
              orderNumber
          ),
      }),
      {
        name: "house-eleven-orders",
      }
    )
  );