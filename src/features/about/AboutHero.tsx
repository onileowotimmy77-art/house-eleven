"use client";

import { motion } from "framer-motion";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import { fadeUp } from "@/lib/animations";

export default function AboutHero() {
  return (
    <Section
     customPadding="py-0"
      className="min-h-screen mt-30 flex items-center"
    >
      <Container>
        <motion.div
          {...fadeUp}
          className="
            mx-auto
            flex
            max-w-5xl
            flex-col
            items-center
            text-center
          "
        >
          <Eyebrow className="justify-center">
            The House
          </Eyebrow>

          <Display
            className="
              mt-10
              max-w-5xl
            "
          >
            House Eleven 
            <br />
            is not built
            <br />
            around clothing.
          </Display>

          <Body
            className="
              mt-12
              max-w-2xl
              text-white/60
            "
          >
            It is built around ideas.

            Every collection begins 
            long before the first garment
            is ever made.
          </Body>
        </motion.div>
      </Container>
    </Section>
  );
}