"use client";

import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import EditorialLink from "@/components/editorial/EditorialLink";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

export default function TheHouse() {
  return (
    <Reveal>
      <section className="mx-auto max-w-6xl">
        {/* Editorial Image */}
        <div
          className="
            relative
            aspect-[16/10]
            overflow-hidden
          "
        >
          <Image
            src="/the-house.jpg"
            alt="The House"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Editorial Copy */}
        <div className="mt-12 max-w-3xl">
          <Eyebrow>THE HOUSE</Eyebrow>

          <Display className="mt-8">
            Its Residents Are Still Arriving
          </Display>

          <Body
            className="
              mt-8
              max-w-2xl
              text-white/60
            "
          >
            House Eleven has been founded, but every House is shaped
            by the people who choose to build it. The photographers,
            models, artists, investors, designers and collaborators
            who define each chapter will become Residents as the story
            unfolds.
          </Body>

          <EditorialLink
            href="/manifesto"
            className="mt-12"
          >
            Read the Manifesto
          </EditorialLink>
        </div>
      </section>
    </Reveal>
  );
}