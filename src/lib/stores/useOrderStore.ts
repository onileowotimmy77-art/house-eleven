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

  updateOrderStatus: (
    orderNumber: string,
    status: OrderStatus
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

        updateOrderStatus: (
          orderNumber,
          status
        ) =>
          set((state) => {
            const updatedOrders =
              state.orders.map(
                (order) =>
                  order.orderNumber ===
                  orderNumber
                    ? {
                        ...order,
                        status,
                      }
                    : order
              );

            const updatedLatestOrder =
              state.latestOrder &&
              state.latestOrder
                .orderNumber ===
                orderNumber
                ? {
                    ...state.latestOrder,
                    status,
                  }
                : state.latestOrder;

            return {
              orders:
                updatedOrders,

              latestOrder:
                updatedLatestOrder,
            };
          }),

        getOrder: (orderNumber) =>
          get().orders.find(
            (order) =>
              order.orderNumber ===
              orderNumber
          ),
      }),
      {
        name:
          "house-eleven-orders",
      }
    )
  );