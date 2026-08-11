"use client";

import {
  create,
} from "zustand";

import {
  persist,
} from "zustand/middleware";

export interface EarlyAccessRequest {
  productSlug: string;
}

interface EarlyAccessStore {
  requests: EarlyAccessRequest[];

  requestEarlyAccess: (
    productSlug: string
  ) => void;

  removeEarlyAccessRequest: (
    productSlug: string
  ) => void;

  hasRequestedEarlyAccess: (
    productSlug: string
  ) => boolean;
}

export const useEarlyAccessStore =
  create<EarlyAccessStore>()(
    persist(
      (set, get) => ({
        requests: [],

        requestEarlyAccess: (
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

        removeEarlyAccessRequest: (
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

        hasRequestedEarlyAccess: (
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
          "house-eleven-early-access",
        skipHydration
      }
    )
  );