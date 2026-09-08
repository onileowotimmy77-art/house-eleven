"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SavedPiece {
  productSlug: string;
}

interface SavedPiecesStore {
  pieces: SavedPiece[];

  savePiece: (productSlug: string) => void;

  removePiece: (productSlug: string) => void;

  replacePieces: (productSlugs: string[]) => void;

  isSaved: (productSlug: string) => boolean;

  clearSavedPieces: () => void;
}

export const useSavedPiecesStore =
  create<SavedPiecesStore>()(
    persist(
      (set, get) => ({
        pieces: [],

        savePiece: (productSlug) => {
          const normalizedSlug =
            productSlug.trim();

          if (!normalizedSlug) {
            return;
          }

          const exists = get().pieces.some(
            (piece) =>
              piece.productSlug ===
              normalizedSlug
          );

          if (exists) {
            return;
          }

          set((state) => ({
            pieces: [
              ...state.pieces,
              {
                productSlug:
                  normalizedSlug,
              },
            ],
          }));
        },

        removePiece: (productSlug) =>
          set((state) => ({
            pieces: state.pieces.filter(
              (piece) =>
                piece.productSlug !==
                productSlug
            ),
          })),

        replacePieces: (productSlugs) => {
          const normalizedSlugs = [
            ...new Set(
              productSlugs
                .map((slug) => slug.trim())
                .filter(Boolean)
            ),
          ];

          set({
            pieces: normalizedSlugs.map(
              (productSlug) => ({
                productSlug,
              })
            ),
          });
        },

        isSaved: (productSlug) =>
          get().pieces.some(
            (piece) =>
              piece.productSlug ===
              productSlug
          ),

        clearSavedPieces: () =>
          set({
            pieces: [],
          }),
      }),
      {
        name: "house-eleven-saved-pieces",
        skipHydration: true,
      }
    )
  );