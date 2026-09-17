"use client";

import {
  useEffect,
  useState,
} from "react";

import AccountLayout from "@/src/features/account/AccountLayout";
import EmptySavedPieces from "@/src/features/account/EmptySavedPiece";
import SavedPieceCard from "@/src/features/account/SavedPieceCard";
import CommerceNotification from "@/src/features/commerce/CommerceNotification";

import { useAuth } from "@/components/providers/AuthProvider";

import { getProduct } from "@/src/data/getProduct";

import {
  removeSavedPiece,
  saveSavedPiece,
} from "@/src/lib/supabase/savedPieces";

import { useBagStore } from "@/src/lib/stores/useBagStore";
import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";

type NotificationType =
  | "removed"
  | "moved"
  | "unavailable";

interface NotificationState {
  productSlug: string;
  type: NotificationType;
  size?: string;
}

export default function SavedPiecesPage() {
  const { user } = useAuth();

  const pieces = useSavedPiecesStore(
    (state) => state.pieces
  );

  const removePiece = useSavedPiecesStore(
    (state) => state.removePiece
  );

  const savePiece = useSavedPiecesStore(
    (state) => state.savePiece
  );

  const addToBag = useBagStore(
    (state) => state.addToBag
  );

  const [
    notification,
    setNotification,
  ] = useState<NotificationState | null>(
    null
  );

  const [
    updatingSlug,
    setUpdatingSlug,
  ] = useState<string | null>(null);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        setNotification(null);
      },
      5000
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [notification]);

  async function handleRemovePiece(
    productSlug: string
  ) {
    if (updatingSlug) {
      return;
    }

    setUpdatingSlug(productSlug);

    removePiece(productSlug);

    /*
     * Guests intentionally remain local-only.
     */
    if (!user) {
      setNotification({
        productSlug,
        type: "removed",
      });

      setUpdatingSlug(null);

      return;
    }

    try {
      await removeSavedPiece(
        productSlug
      );

      setNotification({
        productSlug,
        type: "removed",
      });
    } catch (error) {
      /*
       * Restore the piece locally because
       * remote persistence failed.
       */
      savePiece(productSlug);

      console.error(
        "Failed to remove saved piece:",
        error
      );
    } finally {
      setUpdatingSlug(null);
    }
  }

  async function handleUndoRemove() {
    if (
      !notification ||
      notification.type !== "removed" ||
      updatingSlug
    ) {
      return;
    }

    const productSlug =
      notification.productSlug;

    setUpdatingSlug(productSlug);

    savePiece(productSlug);

    /*
     * Guests intentionally remain local-only.
     */
    if (!user) {
      setNotification(null);
      setUpdatingSlug(null);

      return;
    }

    try {
      await saveSavedPiece(
        productSlug
      );

      setNotification(null);
    } catch (error) {
      /*
       * Restore the removed state because
       * remote persistence failed.
       */
      removePiece(productSlug);

      console.error(
        "Failed to restore saved piece:",
        error
      );
    } finally {
      setUpdatingSlug(null);
    }
  }

  function handleMoveToBag(
  productSlug: string,
  size: string
): boolean {
  if (updatingSlug) {
    return false;
  }

  const wasAdded =
    addToBag({
      productSlug,
      size,
      quantity: 1,
    });

  if (!wasAdded) {
    setNotification({
      productSlug,
      type: "unavailable",
      size,
    });

    return false;
  }

  setUpdatingSlug(productSlug);

  removePiece(productSlug);

  if (!user) {
    setNotification({
      productSlug,
      type: "moved",
      size,
    });

    setUpdatingSlug(null);

    return true;
  }

  void (async () => {
    try {
      await removeSavedPiece(
        productSlug
      );

      setNotification({
        productSlug,
        type: "moved",
        size,
      });
    } catch (error) {
      savePiece(productSlug);

      console.error(
        "Failed to remove moved saved piece:",
        error
      );
    } finally {
      setUpdatingSlug(null);
    }
  })();

  return true;
}

  const notificationProduct =
    notification
      ? getProduct(
          notification.productSlug
        )
      : null;

  const notificationContent =
    notificationProduct &&
    notification
      ? notification.type === "moved"
        ? {
            eyebrow: "Residence",
            title:
              notificationProduct.name,
            subtitle: `Size ${
              notification.size
            } • ${
              notificationProduct.price
            }`,
            message:
              "This piece has entered your Residence.",
            ctaLabel: "View Bag",
            ctaHref: "/bag",
          }
        : notification.type ===
          "unavailable"
        ? {
            eyebrow:
              "Selection Updated",
            title:
              notificationProduct.name,
            subtitle: notification.size
              ? `Size ${notification.size}`
              : notificationProduct.collection,
            message:
              "This size is no longer available in the requested quantity. Please review the current availability.",
          }
        : {
            eyebrow: "Saved Pieces",
            title:
              notificationProduct.name,
            subtitle:
              notificationProduct.collection,
            message:
              "This piece has been removed from your archive.",
            actionLabel: "Undo",
          }
      : null;

  return (
    <>
      <AccountLayout
        title="Saved Pieces"
        description="
          Pieces you've chosen to return to.
        "
      >
        {pieces.length === 0 ? (
          <EmptySavedPieces />
        ) : (
          <div
            className="
              grid
              gap-12
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {pieces.map((piece) => {
              const product =
                getProduct(
                  piece.productSlug
                );

              if (!product) {
                return null;
              }

              return (
                <SavedPieceCard
                  key={product.slug}
                  productSlug={
                    product.slug
                  }
                  image={
                    product.bagImage
                  }
                  name={
                    product.name
                  }
                  collection={
                    product.collection
                  }
                  price={
                    product.price
                  }
                  href={`/products/${product.slug}`}
                  onMoveToBag={(
                    size
                  ) =>
                    handleMoveToBag(
                      product.slug,
                      size
                    )
                  }
                  onRemove={() =>
                    handleRemovePiece(
                      product.slug
                    )
                  }
                />
              );
            })}
          </div>
        )}
      </AccountLayout>

      {notificationProduct &&
        notificationContent && (
          <CommerceNotification
            open
            image={
              notificationProduct.bagImage
            }
            eyebrow={
              notificationContent.eyebrow
            }
            title={
              notificationContent.title
            }
            subtitle={
              notificationContent.subtitle
            }
            message={
              notificationContent.message
            }
            ctaLabel={
              "ctaLabel" in
              notificationContent
                ? notificationContent.ctaLabel
                : undefined
            }
            ctaHref={
              "ctaHref" in
              notificationContent
                ? notificationContent.ctaHref
                : undefined
            }
            actionLabel={
              "actionLabel" in
              notificationContent
                ? notificationContent.actionLabel
                : undefined
            }
            onAction={
              notification?.type ===
              "removed"
                ? handleUndoRemove
                : undefined
            }
            onDismiss={() =>
              setNotification(null)
            }
          />
        )}
    </>
  );
}