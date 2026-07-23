"use client";

import AccountLayout from "@/components/account/AccountLayout";
import SavedPieceCard from "@/components/account/SavedPieceCard";

export default function SavedPiecesPage() {
  return (
    <AccountLayout
      title="Saved Pieces"
      description="Your personal archive of House Eleven pieces."
    >
      <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">

        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">

  <SavedPieceCard
    image="/images/products/residence-polo.jpg"
    name="Residence Polo"
    collection="Residence"
    price="₦145,000"
    href="/products/residence-polo"
  />

  <SavedPieceCard
    image="/images/products/residence-cap.jpg"
    name="Residence Cap"
    collection="Residence"
    price="₦45,000"
    href="/products/residence-cap"
  />

</div>

      </div>
    </AccountLayout>
  );
}