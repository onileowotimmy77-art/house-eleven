"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import { Eyebrow, Display, Body } from "@/components/ui/typography";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function PageIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: PageIntroProps) {
  const centered = align === "center";

  return (
    <Section customPadding="pt-56 pb-32">
      <Container>
        <div
          className={
            centered
              ? "mx-auto max-w-5xl text-center"
              : "max-w-5xl"
          }
        >
          <Eyebrow>{eyebrow}</Eyebrow>

          <Display className="mt-8">
            {title}
          </Display>

          {description && (
            <Body
              className={`
                mt-10
                max-w-3xl
                text-white/60
                ${
                  centered
                    ? "mx-auto"
                    : ""
                }
              `}
            >
              {description}
            </Body>
          )}
        </div>
      </Container>
    </Section>
  );
}