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
    <Section padding="pt-40 pb-24">
      <Container>
        <Reveal>
          <p className="font-mono uppercase tracking-[0.4em] text-white/40">
            {collection.season}
          </p>

          <h1 className="mt-6 text-7xl md:text-8xl font-black uppercase tracking-[-0.05em]">
            {collection.title}
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-white/65 leading-relaxed">
            {collection.description}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}