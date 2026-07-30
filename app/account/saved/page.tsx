"use client";

import { useEffect, useState } from "react";

import AccountLayout from "@/src/features/account/AccountLayout";
import EmptySavedPieces from "@/src/features/account/EmptySavedPiece";
import SavedPieceCard from "@/src/features/account/SavedPieceCard";
import CommerceNotification from "@/src/features/commerce/CommerceNotification";

import { getProduct } from "@/src/data/getProduct";

import { useBagStore } from "@/src/lib/stores/useBagStore";
import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";

interface RemovedPiece {
  productSlug: string;
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

  const [removedPiece, setRemovedPiece] =
    useState<RemovedPiece | null>(null);

  useEffect(() => {
    if (!removedPiece) {
      return;
    }

    const timer = window.setTimeout(() => {
      setRemovedPiece(null);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [removedPiece]);

  function handleRemovePiece(
    productSlug: string
  ) {
    removePiece(productSlug);

    setRemovedPiece({
      productSlug,
    });
  }

  function handleUndoRemove() {
    if (!removedPiece) {
      return;
    }

    savePiece(
      removedPiece.productSlug
    );

    setRemovedPiece(null);
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

    setRemovedPiece({
      productSlug,
    });
  }

  const removedProduct = removedPiece
    ? getProduct(
        removedPiece.productSlug
      )
    : null;

  if (pieces.length === 0) {
    return (
      <>
        <AccountLayout
          title="Saved Pieces"
          description="
            Pieces you've chosen to return to.
          "
        >
          <EmptySavedPieces />
        </AccountLayout>

        {removedProduct && (
          <CommerceNotification
            open
            image={
              removedProduct.bagImage
            }
            eyebrow="Saved Pieces"
            title={
              removedProduct.name
            }
            subtitle={
              removedProduct.collection
            }
            message="
              This piece has been removed
              from your archive.
            "
            actionLabel="Undo"
            onAction={
              handleUndoRemove
            }
          />
        )}
      </>
    );
  }

  return (
    <>
      <AccountLayout
        title="Saved Pieces"
        description="
          Pieces you've chosen to return to.
        "
      >
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

            return (
              <SavedPieceCard
                key={product.slug}
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
                href={
                 `/products/${product.slug}`
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
      </AccountLayout>

      {removedProduct && (
        <CommerceNotification
          open
          image={
            removedProduct.bagImage
          }
          eyebrow="Saved Pieces"
          title={
            removedProduct.name
          }
          subtitle={
            removedProduct.collection
          }
          message="
            This piece has been removed
            from your archive.
          "
          actionLabel="Undo"
          onAction={
            handleUndoRemove
          }
        />
      )}
    </>
  );
}