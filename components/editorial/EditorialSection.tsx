"use client";

import { ReactNode } from "react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

interface EditorialSectionProps {
  children: ReactNode;
  className?: string;
  padding?: string;
}

export default function EditorialSection({
  children,
  className = "",
  padding = "py-48",
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