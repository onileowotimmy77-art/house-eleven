"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import JournalFeature from "./JournalFeature";

export default function Journal() {
  return (
    <Section customPadding="py-44">
      <Container>
        <JournalFeature />
      </Container>
    </Section>
  );
}