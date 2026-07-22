"use client";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import CommerceButton from "./CommerceButton";

interface CommerceEmptyProps {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export default function CommerceEmpty({
  eyebrow,
  title,
  description,
  cta,
  href,
}: CommerceEmptyProps) {
  return (
    <Section customPadding="py-56">
      <Container>

        <Reveal>

          <div className="mx-auto max-w-4xl text-center">

            <Eyebrow>
              {eyebrow}
            </Eyebrow>

            <Display className="mt-8">
              {title}
            </Display>

            <Body
              className="
                mx-auto
                mt-10
                max-w-2xl
              "
            >
              {description}
            </Body>

            <CommerceButton
              href={href}
              className="mt-16"
            >
              {cta}
            </CommerceButton>

          </div>

        </Reveal>

      </Container>
    </Section>
  );
}