"use client";

import Reveal from "@/components/motion/Reveal";

import CommerceButton from "@/src/features/commerce/CommerceButton";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import ReviewItems from "./ReviewItems";
import ReviewTotals from "./ReviewTotals";

export default function CheckoutReview() {
  return (
    <section className="py-40">

      <Reveal>

        <Eyebrow>
          Chapter IV
        </Eyebrow>

        <Display className="mt-8">
          Review
        </Display>

        <Body
          className="
            mt-8
            max-w-2xl
          "
        >
          Take one final look before your order begins its journey.
        </Body>

      </Reveal>

      <div className="mt-24">

        <ReviewItems
          items={[
            {
              id: "1",
              name: "Residence Polo",
              color: "Black",
              size: "Medium",
              price: "₦145,000",
            },
            {
              id: "2",
              name: "Residence Cap",
              color: "Black",
              size: "One Size",
              price: "₦45,000",
            },
          ]}
        />

        <ReviewTotals
          subtotal="₦190,000"
          shipping="Calculated at checkout"
          total="₦190,000"
        />

        <CommerceButton
          href="/checkout/confirmation"
          className="mt-20 w-full"
        >
          Confirm Order
        </CommerceButton>

      </div>

    </section>
  );
}