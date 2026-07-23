"use client";

import CommerceButton from "@/components/commerce/CommerceButton";

import {
  Display,
  Body,
} from "@/components/ui/typography";

export default function EmptySavedPieces() {
  return (
    <section
      className="
        flex
        flex-col
        items-center
        justify-center

        py-32

        text-center
      "
    >
      <Display>
        Your Archive Awaits
      </Display>

      <Body
        className="
          mt-8
          max-w-xl
          text-white/55
        "
      >
        Save the pieces that speak to you.
        They'll remain here whenever you're ready to
        return.
      </Body>

      <CommerceButton
        href="/collections"
        className="mt-16"
      >
        Explore Collections
      </CommerceButton>
    </section>
  );
}