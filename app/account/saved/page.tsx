"use client";

import AccountLayout from "@/src/features/account/AccountLayout";
import SavedPieceCard from "@/src/features/account/SavedPieceCard";
import EmptySavedPieces from "@/src/features/account/EmptySavedPiece";

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

          function handleMoveToBag() {
            addToBag({
              productSlug: product.slug,
              size: product.sizes[0],
              quantity: 1,
            });

            removePiece(product.slug);
          }

          return (
            <SavedPieceCard
              key={product.slug}
              image={product.bagImage}
              name={product.name}
              collection={product.collection}
              price={product.price}
              href={`/products/${product.slug}`}
              onMoveToBag={handleMoveToBag}
              onRemove={() =>
                removePiece(product.slug)
              }
            />
          );
        })}
      </div>
    </AccountLayout>
  );
}