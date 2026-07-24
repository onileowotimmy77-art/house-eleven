"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import CommerceHeader from "@/src/features/commerce/CommerceHeader";

import ConfirmationHero from "@/src/features/confirmation/ConfirmationHero";
import ConfirmationSummary from "@/src/features/confirmation/ConfirmationSummary";
import ConfirmationTimeline from "@/src/features/confirmation/ConfirmationTimeline";
import ConfirmationActions from "@/src/features/confirmation/ConfirmationActions";

export default function ConfirmationPage() {
  return (
    <>
      <CommerceHeader
        eyebrow=""
        description=""
        title="Confirmation"
      />

      <Section customPadding="py-20">

        <Container className="max-w-5xl">

          <ConfirmationHero />

          <ConfirmationSummary
            orderNumber="#HE-2026-001284"
            paymentMethod="Debit / Credit Card"
            estimatedDelivery="3–5 Business Days"
            total="₦190,000"
          />

          <ConfirmationTimeline />

          <ConfirmationActions />

        </Container>

      </Section>
    </>
  );
}