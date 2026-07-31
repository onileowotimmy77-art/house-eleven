"use client";

import {
  useEffect,
  useState,
} from "react";

import AccountLayout from "@/src/features/account/AccountLayout";
import EmptySavedPieces from "@/src/features/account/EmptySavedPiece";
import SavedPieceCard from "@/src/features/account/SavedPieceCard";
import CommerceNotification from "@/src/features/commerce/CommerceNotification";

import { getProduct } from "@/src/data/getProduct";

import { useBagStore } from "@/src/lib/stores/useBagStore";
import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";

type NotificationType =
  | "removed"
  | "moved";

interface NotificationState {
  productSlug: string;
  type: NotificationType;
}

export default function SavedPiecesPage() {
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

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = window.setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [notification]);

  function handleRemovePiece(
    productSlug: string
  ) {
    removePiece(productSlug);

    setNotification({
      productSlug,
      type: "removed",
    });
  }

  function handleUndoRemove() {
    if (
      !notification ||
      notification.type !== "removed"
    ) {
      return;
    }

    savePiece(
      notification.productSlug
    );

    setNotification(null);
  }

  function handleMoveToBag(
    productSlug: string,
    size: string
  ) {
    addToBag({
      productSlug,
      size,
      quantity: 1,
    });

    removePiece(productSlug);

    setNotification({
      productSlug,
      type: "moved",
    });
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
              notificationProduct.sizes[0]
            } • ${
              notificationProduct.price
            }`,
            message:
              "This piece has entered your Residence.",
            ctaLabel: "View Bag",
            ctaHref: "/bag",
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

              const firstAvailableSize =
                product.sizes[0];

              if (!firstAvailableSize) {
                return null;
              }

              return (
                <SavedPieceCard
                  key={product.slug}
                  image={product.bagImage}
                  name={product.name}
                  collection={
                    product.collection
                  }
                  price={product.price}
                  href={`
                    /products/${product.slug}`
                  }
                  onMoveToBag={() =>
                    handleMoveToBag(
                      product.slug,
                      firstAvailableSize
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
            
          />
        )}
    </>
  );
}