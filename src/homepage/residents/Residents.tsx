"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import TheHouse from "./TheHouse";

export default function Residents() {
  return (
    <Section customPadding="py-48">
      <Container>
        <TheHouse />
      </Container>
    </Section>
  );
}