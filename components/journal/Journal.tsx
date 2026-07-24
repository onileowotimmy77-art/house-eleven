"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import HomepageJournalFeature from "./HomepageJournalFeature";

export default function Journal() {
  return (
    <Section customPadding="py-44">
      <Container>
        <HomepageJournalFeature />
      </Container>
    </Section>
  );
}