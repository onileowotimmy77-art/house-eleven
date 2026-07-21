"use client";

import { motion } from "framer-motion";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import { fadeUp } from "@/lib/";

export default function AboutHouse() {
  return (
    <Section customPadding="py-56">
      <Container>
        <div className="grid grid-cols-12">

          {/* Left Editorial Margin */}

          <div className="hidden lg:block lg:col-span-2" />

          {/* Main Editorial Column */}

          <motion.div
            {...fadeUp}
            className="
              col-span-12
              lg:col-span-7
            "
          >
            <Eyebrow>
              The House
            </Eyebrow>

            <Display
              className="
                mt-10
                max-w-4xl
              "
            >
              House Eleven exists
              to create objects
              of permanence.
            </Display>

            <div className="mt-20 space-y-12 max-w-3xl">

              <Body className="text-white/60">
                The House is built on the belief that clothing
                should outlive the moment in which it is introduced.
                Every collection begins with an idea that is refined,
                challenged and reduced until only what is essential
                remains.
              </Body>

              <Body className="text-white/60">
                We do not pursue novelty for its own sake.
                We pursue proportion, material, discipline
                and restraint...qualities that remain relevant
                long after trends have disappeared.
              </Body>

              <Body className="text-white/60">
                Every garment released by House Eleven becomes
                part of a continuing record of the House,
                contributing to a body of work that values
                permanence over excess and confidence over noise.
              </Body>

            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}