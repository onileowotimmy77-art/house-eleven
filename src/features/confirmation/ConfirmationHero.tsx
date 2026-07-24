"use client";

import Reveal from "@/components/motion/Reveal";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

export default function ConfirmationHero() {
  return (
    <section>

      <Reveal>

        <Eyebrow>
          Confirmation
        </Eyebrow>

        <Display className="mt-8">
          Order Confirmed
        </Display>

        <Body
          className="
            mt-8
            max-w-2xl
          "
        >
          Your Residence has been reserved.
          Every piece will now move through preparation,
          inspection, and dispatch before beginning its
          journey to you.
        </Body>

      </Reveal>

    </section>
  );
}