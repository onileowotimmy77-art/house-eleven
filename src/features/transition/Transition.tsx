"use client";

import FadeUp from "@/components/ui/FadeUp";
import Container from "@/components/layout/Container";
import Editorial from "@/components/ui/typography/Editorial";

export default function Transition() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <Container className="max-w-5xl">

        <FadeUp delay={0.2}>
          <Editorial className="text-center">
            Every piece is a decision.
          </Editorial>
        </FadeUp>

      </Container>
    </section>
  );
}