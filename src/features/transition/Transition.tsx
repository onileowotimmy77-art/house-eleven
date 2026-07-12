"use client";

import FadeUp from "@/components/ui/FadeUp";
import Container from "@/components/layout/Container";

export default function Transition() {
  return (
    <section className="min-h-[50vh] flex items-center justify-center py-24">
      <Container className="max-w-6xl">

        <FadeUp>
          <h2
            className="
              text-center
              mt-20
              font-black
              uppercase
              tracking-[-0.05em]
              leading-[1]
              text-[clamp(3rem,6vw,5.5rem)]
            "
          >
            Every piece begins with intention.
          </h2>
        </FadeUp>

      </Container>
    </section>
  );
}