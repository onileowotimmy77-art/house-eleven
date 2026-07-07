"use client";

import CollectionHeader from "./CollectionHeader";
import CollectionCard from "./CollectionCard";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Stagger from "@/components/motion/Stagger";

import { collections } from "@/data/collections";

export default function Collections() {
  return (
    <Section padding="py-48">
      <Container>
        <CollectionHeader />

        <Stagger>
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
            />
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}