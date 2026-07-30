"use client";

import {
  useEffect,
  useState,
} from "react";

import AccountLayout from "@/src/features/account/AccountLayout";
import SavedPieceCard from "@/src/features/account/SavedPieceCard";
import EmptySavedPieces from "@/src/features/account/EmptySavedPiece";

import CommerceNotification from "@/src/features/commerce/CommerceNotification";

import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";
import { useBagStore } from "@/src/lib/stores/useBagStore";

import { getProduct } from "@/src/data/getProduct";

interface RemovedPiece {
  productSlug: string;
}

export default function SavedPiecesPage() {
  const pieces = useSavedPiecesStore(
    (state) => state.pieces
  );

  const savePiece = useSavedPiecesStore(
    (state) => state.savePiece
  );

  const removePiece = useSavedPiecesStore(
    (state) => state.removePiece
  );

  const addToBag = useBagStore(
    (state) => state.addToBag
  );

  const [
    removedPiece,
    setRemovedPiece,
  ] = useState<RemovedPiece | null>(
    null
  );

  useEffect(() => {
    if (!removedPiece) {
      return;
    }

    const timer = window.setTimeout(() => {
      setRemovedPiece(null);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [removedPiece]);

  function handleRemove(
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

  const removedProduct = removedPiece
    ? getProduct(
        removedPiece.productSlug
      )
    : null;

  return (
    <>
      <AccountLayout
        title="Saved Pieces"
        description="Pieces you've chosen to return to."
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
              const product = getProduct(
                piece.productSlug
              );

              if (!product) {
                return null;
              }

              function handleMoveToBag() {
                addToBag({
                  productSlug:
                    product.slug,
                  size:
                    product.sizes[0],
                  quantity: 1,
                });

                removePiece(
                  product.slug
                );
              }

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
                    /products/${product.slug}
                  }
                  onMoveToBag={
                    handleMoveToBag
                  }
                  onRemove={() =>
                    handleRemove(
                      product.slug
                    )
                  }
                />
              );
            })}
          </div>
        )}
      </AccountLayout>

      {removedProduct && (
        <CommerceNotification
          open
          image={
            removedProduct.bagImage
          }
          eyebrow="Removed"
          title={
            removedProduct.name
          }
          subtitle={
            removedProduct.collection
          }
          message="
            This piece has been removed
            from your personal archive.
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