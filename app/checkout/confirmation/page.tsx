"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import CommerceHeader from "@/src/features/commerce/CommerceHeader";

import ConfirmationHero from "@/src/features/confirmation/ConfirmationHero";
import ConfirmationSummary from "@/src/features/confirmation/ConfirmationSummary";
import ConfirmationItems from "@/src/features/confirmation/ConfirmationItems";
import ConfirmationTimeline from "@/src/features/confirmation/ConfirmationTimeline";
import ConfirmationActions from "@/src/features/confirmation/ConfirmationActions";

import { useOrderStore } from "@/src/lib/stores/useOrderStore";

export default function ConfirmationPage() {
  const router = useRouter();
const [hasHydrated, setHasHydrated] =
  useState(false);

useEffect(() => {
  setHasHydrated(
    useOrderStore.persist.hasHydrated()
  );

  const unsubscribe =
    useOrderStore.persist.onFinishHydration(
      () => {
        setHasHydrated(true);
      }
    );

  return unsubscribe;
}, []);

  const latestOrder = useOrderStore(
    (state) => state.latestOrder
  );

  if (!hasHydrated) {
  return null;
}

if (!latestOrder) {
  router.replace("/bag");

  return null;
}

  const formattedTotal =
    new Intl.NumberFormat(
      "en-NG"
    ).format(
      latestOrder.total
    );

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
  orderNumber={
    latestOrder.orderNumber
  }
  paymentMethod={
    latestOrder.paymentMethod
  }
  estimatedDelivery={
    latestOrder.estimatedDelivery
  }
  total={`₦${formattedTotal}`}
/>

<ConfirmationItems
  items={latestOrder.items}
/>

<ConfirmationTimeline  
  order={latestOrder}
/>

          <ConfirmationActions />
        </Container>
      </Section>
    </>
  );
}