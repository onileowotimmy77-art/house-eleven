"use client";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import CheckoutIdentity from "./CheckoutIdentity";
import CheckoutDelivery from "./CheckoutDelivery";

export default function CheckoutSection() {
  return (
    <Section customPadding="py-40">

      <Container>

        <div className="max-w-5xl">

          <CheckoutIdentity />

          <CheckoutDelivery />

          <Checkout

          {/* Review */}

        </div>

      </Container>

    </Section>
  );
}