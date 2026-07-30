"use client";

import { useState } from "react";

import AccountLayout from "@/src/features/account/AccountLayout";
import SavedPieceCard from "@/src/features/account/SavedPieceCard";

import EmptySavedPieces from "@/src/features/account/EmptySavedPiece";
import CommerceNotification from "@/src/features/commerce/CommerceNotification";

import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";
import { useBagStore } from "@/src/lib/stores/useBagStore";

import { getProduct } from "@/src/data/getProduct";

export default function SavedPiecesPage() {
  const pieces = useSavedPiecesStore(
    (state) => state.pieces
  );

  const removePiece = useSavedPiecesStore(
    (state) => state.removePiece
  );

  const addToBag = useBagStore(
    (state) => state.addToBag
  );

  const [notification, setNotification] =
    useState(false);

  const [movedProduct, setMovedProduct] =
    useState<{
      image: string;
      name: string;
      price: string;
    } | null>(null);

  if (pieces.length === 0) {
    return (
      <AccountLayout
        title="Saved Pieces"
        description="Pieces you've chosen to return to."
      >
        <EmptySavedPieces />
      </AccountLayout>
    );
  }

  return (
    <>
      <AccountLayout
        title="Saved Pieces"
        description="Pieces you've chosen to return to."
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
            const product = getProduct(
              piece.productSlug
            );

            if (!product) {
              return null;
            }

            const {
              slug,
              bagImage,
              name,
              collection,
              price,
              sizes,
            } = product;

            function handleMoveToBag() {
              addToBag({
                productSlug: slug,
                size: sizes[0],
                quantity: 1,
              });

              removePiece(slug);

              setMovedProduct({
                image: bagImage,
                name,
                price,
              });

              setNotification(true);

              setTimeout(() => {
                setNotification(false);
              }, 3000);
            }

            return (
              <SavedPieceCard
                key={slug}
                image={bagImage}
                name={name}
                collection={collection}
                price={price}
                href={`/products/${slug}`}
                onMoveToBag={handleMoveToBag}
                onRemove={() =>
                  removePiece(slug)
                }
              />
            );
          })}
        </div>
      </AccountLayout>

      {movedProduct && (
        <CommerceNotification
          open={notification}
          image={movedProduct.image}
          eyebrow="Residence"
          title={movedProduct.name}
          subtitle={movedProduct.price}
          message="Moved to your Residence."
          ctaLabel="View Bag"
          ctaHref="/bag"
        />
      )}
    </>
  );
}