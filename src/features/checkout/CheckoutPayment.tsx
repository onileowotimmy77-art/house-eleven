"use client";

import Reveal from "@/components/motion/Reveal";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import PaymentMethodCard from "./PaymentMethodCard";

import type { CheckoutPaymentMethod } from "./CheckoutSection";

interface CheckoutPaymentProps {
  paymentMethod: CheckoutPaymentMethod;
  onPaymentMethodChange: (
    method: CheckoutPaymentMethod
  ) => void;
}

export default function CheckoutPayment({
  paymentMethod,
  onPaymentMethodChange,
}: CheckoutPaymentProps) {
  return (
    <section className="py-40">
      <Reveal>
        <Eyebrow>
          Chapter III
        </Eyebrow>

        <Display className="mt-8">
          Payment
        </Display>

        <Body
          className="
            mt-8
            max-w-2xl
          "
        >
          Choose how you'd like to complete your purchase.
        </Body>
      </Reveal>

      <div className="mt-24 space-y-6">
        <PaymentMethodCard
          title="Debit / Credit Card"
          description="Visa, Mastercard and supported payment providers."
          selected={
            paymentMethod === "card"
          }
          onClick={() =>
            onPaymentMethodChange(
              "card"
            )
          }
        />

        <PaymentMethodCard
          title="Bank Transfer"
          description="Complete your purchase through a verified bank transfer."
          selected={
            paymentMethod === "bank"
          }
          onClick={() =>
            onPaymentMethodChange(
              "bank"
            )
          }
        />
      </div>
    </section>
  );
}