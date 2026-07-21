"use client";

import { Collection } from "@/types/collection";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

interface CollectionQuoteProps {
  collection: Collection;
}

export default function CollectionQuote({
  collection,
}: CollectionQuoteProps) {
  return (
    <Section customPadding="py-32">
      <Container>
        <Reveal>
          <blockquote className="max-w-4xl text-5xl font-black leading-tight tracking-[-0.04em]">
            “{collection.quote}”
          </blockquote>
        </Reveal>
      </Container>
    </Section>
  );
}