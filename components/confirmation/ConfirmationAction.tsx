"use client";

import CommerceButton from "@/components/commerce/CommerceButton";

export default function ConfirmationActions() {
  return (
    <section className="mt-40">

      <div
        className="
          flex
          flex-col
          gap-6

          md:flex-row
        "
      >
        <CommerceButton
          href="/collections"
          className="flex-1"
        >
          Continue Exploring
        </CommerceButton>

        <CommerceButton
          href="/account/orders"
          variant="secondary"
          className="flex-1"
        >
          View Orders
        </CommerceButton>
      </div>

    </section>
  );
}