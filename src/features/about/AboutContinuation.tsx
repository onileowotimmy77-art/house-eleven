"use client";

import { motion } from "framer-motion";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import  FadeUp from "@/components/ui/FadeUp

export default function AboutContinuation() {
  return (
    <Section customPadding="py-56">
      <Container>
        <motion.div
          {...FadeUp}
          className="
            mx-auto
            flex
            max-w-4xl
            flex-col
            items-center
            text-center
          "
        >
          <Eyebrow className="justify-center">
            Continuation
          </Eyebrow>

          <Display
            className="
              mt-10
              max-w-4xl
            "
          >
            Every collection
            will eventually
            become history.
          </Display>

          <Body
            className="
              mt-14
              max-w-2xl
              text-white/60
            "
          >
            The House continues.
            Every idea refined.
            Every garment preserved.
            Every chapter contributing
            to a body of work that grows
            more complete with time.
          </Body>
        </motion.div>
      </Container>
    </Section>
  );
}