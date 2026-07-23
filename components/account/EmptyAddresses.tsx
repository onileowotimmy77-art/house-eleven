"use client";

import CommerceButton from "@/components/commerce/CommerceButton";

import {
  Body,
  Display,
} from "@/components/ui/typography";

export default function EmptyAddresses() {
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
        No Destinations Yet
      </Display>

      <Body
        className="
          mt-8
          max-w-xl
          text-white/55
        "
      >
        Add a delivery destination for future
        House Eleven orders.
      </Body>

      <CommerceButton
        href="/account/addresses/new"
        className="mt-16"
      >
        Add Address
      </CommerceButton>
    </section>
  );
}