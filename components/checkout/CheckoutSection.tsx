"use client";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import CheckoutIdentity from "./CheckoutIdentity";

export default function CheckoutSection() {
  return (
    <Section customPadding="py-40">

      <Container>

        <div className="max-w-5xl">

          <CheckoutIdentity />

          {/* Delivery */}

          {/* Payment */}

          {/* Review */}

        </div>

      </Container>

    </Section>
  );
}