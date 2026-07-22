"use client";

import Reveal from "@/components/motion/Reveal";

import CommerceButton from "@/components/commerce/CommerceButton";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import ReviewRow from "./ReviewRow";

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
          Review every detail before your order is confirmed.
        </Body>

      </Reveal>

      <div className="mt-24">

        <ReviewRow
          label="Pieces"
          value="2"
        />

        <ReviewRow
          label="Subtotal"
          value="₦290,000"
        />

        <ReviewRow
          label="Shipping"
          value="Calculated at checkout"
        />

        <ReviewRow
          label="Payment"
          value="Debit / Credit Card"
        />

        <ReviewRow
          label="Destination"
          value="Lagos, Nigeria"
        />

      </div>

      <div className="mt-20">

        <CommerceButton
          href="/checkout/confirmation"
          className="w-full"
        >
          Confirm Order
        </CommerceButton>

      </div>

    </section>
  );
}