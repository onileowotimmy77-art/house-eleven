"use client";

import {
  create,
} from "zustand";

import {
  persist,
} from "zustand/middleware";

export interface RestockRequest {
  productSlug: string;
}

interface RestockStore {
  requests: RestockRequest[];

  requestRestock: (
    productSlug: string
  ) => void;

  removeRestockRequest: (
    productSlug: string
  ) => void;

  hasRequestedRestock: (
    productSlug: string
  ) => boolean;
}

export const useRestockStore =
  create<RestockStore>()(
    persist(
      (set, get) => ({
        requests: [],

        requestRestock: (
          productSlug
        ) =>
          set((state) => {
            const alreadyRequested =
              state.requests.some(
                (request) =>
                  request.productSlug ===
                  productSlug
              );

            if (alreadyRequested) {
              return state;
            }

            return {
              requests: [
                ...state.requests,
                {
                  productSlug,
                },
              ],
            };
          }),

        removeRestockRequest: (
          productSlug
        ) =>
          set((state) => ({
            requests:
              state.requests.filter(
                (request) =>
                  request.productSlug !==
                  productSlug
              ),
          })),

        hasRequestedRestock: (
          productSlug
        ) =>
          get().requests.some(
            (request) =>
              request.productSlug ===
              productSlug
          ),
      }),
      {
        name:
          "house-eleven-restock",
          
      }
    )
  );