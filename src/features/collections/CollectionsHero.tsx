"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

export default function CollectionsHero() {
  return (
    <Section
      customPadding="pt-40 pb-32"
      className="min-h-[85vh] flex items-center"
    >
      <Container>
        <div className="max-w-5xl">
          <Eyebrow>
            Collections
          </Eyebrow>

          <Display className="mt-8">
            Every chapter documents a moment in the evolution of House Eleven.
          </Display>

          <Body
            className="
              mt-10
              max-w-2xl
              text-xl
              leading-9
              text-white/60
            "
          >
            Rather than seasonal releases, House Eleven is presented through
            chapters—each exploring a distinct philosophy, silhouette, and way
            of living.
          </Body>
        </div>

        <div
          className="
            mt-24
            font-mono
            text-[11px]
            uppercase
            tracking-[0.4em]
            text-white/35
          "
        >
          Scroll to enter
        </div>
      </Container>
    </Section>
  );
}