"use client";

import AccountLayout from "@/src/features/account/AccountLayout";
import SavedPieceCard from "@/src/features/account/SavedPieceCard";
import EmptySavedPieces from "@/src/features/account/EmptySavedPiece";

import { useSavedPiecesStore } from "@/src/lib/stores/useSavedPiecesStore";

import { getProduct } from "@/src/data/getProduct";

export default function SavedPiecesPage() {
  const pieces = useSavedPiecesStore(
    (state) => state.pieces
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

          return (
            <SavedPieceCard
              key={product.slug}
              image={product.bagImage}
              name={product.name}
              collection={product.collection}
              price={product.price}
              href={`/products/${product.slug}`}
            />
          );
        })}
      </div>
    </AccountLayout>
  );
}