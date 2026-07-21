"use client";

import { motion } from "framer-motion";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import FadeUp from "@/components/ui/FadeUp";

const process = [
  "Observation",
  "Research",
  "Design",
  "Refinement",
  "Collection",
  "Archive",
];

export default function AboutProcess() {
  return (
    <Section customPadding="py-56">
      <Container>

        <motion.div
          {...FadeUp}
          className="max-w-4xl"
        >
          <Eyebrow>
            The Making
          </Eyebrow>

          <Display className="mt-10">
            Every collection
            begins long before
            the first garment.
          </Display>

          <Body
            className="
              mt-12
              max-w-2xl
              text-white/60
            "
          >
            House Eleven is built through a deliberate process.
            Ideas are observed, challenged and refined until
            only what deserves to exist remains.
          </Body>
        </motion.div>

        <div className="mt-32 border-t border-white/10">

          {process.map((step, index) => (
            <motion.div
              key={step}
              {...FadeUp}
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/10
                py-12
              "
            >
              <span
                className="
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.45em]
                  text-white/30
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3
                className="
                  text-2xl
                  font-medium
                  tracking-[-0.03em]
                "
              >
                {step}
              </h3>
            </motion.div>
          ))}

        </div>

      </Container>
    </Section>
  );
}