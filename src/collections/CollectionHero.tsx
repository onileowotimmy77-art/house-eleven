"use client";

import { Collection } from "@/types/collection";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

interface CollectionHeroProps {
  collection: Collection;
}

export default function CollectionHero({
  collection,
}: CollectionHeroProps) {
  return (
    <Section customPadding="pt-40 pb-40">
      <Container>
        <Reveal>
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.45em]
              text-white/35
            "
          >
            {collection.chapter}
          </p>

          <h1
            className="
              mt-8
              text-[clamp(4.5rem,10vw,8rem)]
              font-black
              uppercase
              tracking-[-0.06em]
              leading-[0.9]
            "
          >
            {collection.title}
          </h1>

          <div className="mt-24 max-w-3xl">
            <p
              className="
                text-[clamp(2rem,4vw,3.5rem)]
                leading-[1.15]
                tracking-[-0.04em]
                text-white/90
              "
            >
              Every house
              <br />
              begins
              <br />
              with a first room.
            </p>
          </div>

          <div className="mt-32">
            <p
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.45em]
                text-white/30
              "
            >
              {collection.season}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}