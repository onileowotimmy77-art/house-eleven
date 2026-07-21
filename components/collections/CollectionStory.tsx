"use client";

import { Collection } from "@/types/collection";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

interface CollectionStoryProps {
  collection: Collection;
}

export default function CollectionStory({
  collection,
}: CollectionStoryProps) {
  return (
    <Section customPadding="py-24">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/40">
              Story
            </h2>

            <p className="mt-8 text-2xl leading-relaxed text-white/80">
              {collection.story}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}