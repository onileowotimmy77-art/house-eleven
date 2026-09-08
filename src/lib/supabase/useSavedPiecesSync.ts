"use client";

import {
  useEffect,
  useRef,
} from "react";

import { useAuth } from "@/components/providers/AuthProvider";

import {
  getSavedPieces,
  saveSavedPieces,
} from "./savedPieces";

import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";

export function useSavedPiecesSync() {
  const { user, loading } = useAuth();

  const replacePieces =
    useSavedPiecesStore(
      (state) => state.replacePieces
    );

  const hasSyncedUser =
    useRef<string | null>(null);

  useEffect(() => {
    if (loading) {
      return;
    }

    /*
     * Guest session:
     *
     * Keep the local archive untouched.
     * No Supabase request should occur.
     */
    if (!user) {
      hasSyncedUser.current = null;
      return;
    }

    /*
     * Prevent duplicate synchronization
     * for the same authenticated session.
     */
    if (
      hasSyncedUser.current === user.id
    ) {
      return;
    }

    let cancelled = false;

    const userId = user.id;

    async function synchronize() {
      try {
        /*
         * Capture the current local archive
         * before replacing anything.
         */
        const localPieces =
          useSavedPiecesStore
            .getState()
            .pieces;

        const localSlugs =
          localPieces.map(
            (piece) =>
              piece.productSlug
          );

        /*
         * Fetch the resident's archive.
         *
         * RLS guarantees that this can only
         * return rows belonging to auth.uid().
         */
        const remotePieces =
          await getSavedPieces();

        if (cancelled) {
          return;
        }

        const remoteSlugs =
          remotePieces.map(
            (piece) =>
              piece.product_slug
          );

        /*
         * Merge both archives while preserving
         * insertion order.
         *
         * Local selections are kept first so
         * a guest's existing archive is never
         * silently discarded.
         */
        const mergedSlugs = [
          ...localSlugs,
          ...remoteSlugs,
        ].filter(
          (slug, index, collection) =>
            collection.indexOf(slug) ===
            index
        );

        /*
         * Only send pieces that do not already
         * exist in the resident archive.
         */
        const remoteSlugSet =
          new Set(remoteSlugs);

        const missingRemoteSlugs =
          localSlugs.filter(
            (slug) =>
              !remoteSlugSet.has(slug)
          );

        if (
          missingRemoteSlugs.length > 0
        ) {
          await saveSavedPieces(
            missingRemoteSlugs
          );

          if (cancelled) {
            return;
          }
        }

        /*
         * The merged archive is now the
         * resident's canonical UI state.
         */
        replacePieces(mergedSlugs);

        hasSyncedUser.current =
          user.id;
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to synchronize saved pieces:",
          error
        );
      }
    }

    void synchronize();

    return () => {
      cancelled = true;
    };
  }, [
    loading,
    user,
    replacePieces,
  ]);
}