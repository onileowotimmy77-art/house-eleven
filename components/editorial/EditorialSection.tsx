"use client";

import { ReactNode } from "react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import type { SectionSpacingKey } from "@/src/lib/spacing";

interface EditorialSectionProps {
  children: ReactNode;
  className?: string;
  padding?: SectionSpacingKey;
}

export default function EditorialSection({
  children,
  className = "",
  padding = "lg",
}: EditorialSectionProps) {
  return (
    <Section
      padding={padding}
      className={className}
    >
      <Container>
        {children}
      </Container>
    </Section>
  );
}