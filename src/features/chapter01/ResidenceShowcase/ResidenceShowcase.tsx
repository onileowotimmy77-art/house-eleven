"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import FeaturedResidence from "./FeaturedResidence";
import ResidenceGrid from "./ResidenceGrid";

export default function ResidenceShowcase() {
  return (
    <Section customPadding="pt-64 pb-48">
      <Container>

        <FeaturedResidence />

        <ResidenceGrid />

      </Container>
    </Section>
  );
}