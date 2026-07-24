"use client";

import Reveal from "@/components/motion/Reveal";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

interface CommerceHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

export default function CommerceHeader({
  eyebrow,
  title,
  description,
  className = "",
}: CommerceHeaderProps) {
  return (
    <Section
      customPadding="pt-48 pb-24"
      className={className}
    >
      <Container>

        <Reveal>

          <Eyebrow>
            {eyebrow}
          </Eyebrow>

          <Display
            className="
              mt-8
              max-w-5xl
            "
          >
            {title}
          </Display>

          <Body
            className="
              mt-10
              max-w-2xl
            "
          >
            {description}
          </Body>

        </Reveal>

      </Container>
    </Section>
  );
}