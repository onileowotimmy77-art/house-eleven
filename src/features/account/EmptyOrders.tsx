"use client";

import CommerceButton from "@/src/features/commerce/CommerceButton";

import {
  Display,
  Body,
} from "@/components/ui/typography";

export default function EmptyOrders() {
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
        Nothing Yet
      </Display>

      <Body
        className="
          mt-8
          max-w-xl
          text-white/55
        "
      >
        Every House begins somewhere.
        Your future orders will appear here once your first
        Residence has been reserved.
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