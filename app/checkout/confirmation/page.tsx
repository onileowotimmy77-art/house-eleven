"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import CommerceHeader from "@/components/commerce/CommerceHeader";

import ConfirmationHero from "@/components/confirmation/ConfirmationHero";
import ConfirmationSummary from "@/components/confirmation/ConfirmationSummary";
import ConfirmationTimeline from "@/components/confirmation/ConfirmationTimeline";
import ConfirmationActions from "@/components/confirmation/ConfirmationActions";

export default function ConfirmationPage() {
  return (
    <>
      <CommerceHeader
      
        title="Confirmation"
      />

      <Section customPadding="py-48">

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