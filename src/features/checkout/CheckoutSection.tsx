"use client";

import { useState } from "react";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import CheckoutIdentity from "./CheckoutIdentity";
import CheckoutDelivery from "./CheckoutDelivery";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutReview from "./CheckoutReview";

export type CheckoutPaymentMethod =
  | "card"
  | "bank";

export default function CheckoutSection() {
  const [paymentMethod, setPaymentMethod] =
    useState<CheckoutPaymentMethod>("card");

  return (
    <Section customPadding="py-40">
      <Container>
        <div className="max-w-5xl">
          <CheckoutIdentity />

          <CheckoutDelivery />

          <CheckoutPayment
            paymentMethod={paymentMethod}
            onPaymentMethodChange={
              setPaymentMethod
            }
          />

          <CheckoutReview
            paymentMethod={paymentMethod}
          />
        </div>
      </Container>
    </Section>
  );
}