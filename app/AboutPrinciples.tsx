"use client";

import { motion } from "framer-motion";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import {
  Eyebrow,
  Display,
} from "@/components/ui/typography";

import { fadeUp } from "@/lib/motion";

const principles = [
  {
    number: "01",
    title: "Permanence",
    subtitle: "over novelty.",
  },
  {
    number: "02",
    title: "Craft",
    subtitle: "before attention.",
  },
  {
    number: "03",
    title: "Architecture",
    subtitle: "before decoration.",
  },
  {
    number: "04",
    title: "Quiet confidence",
    subtitle: "over noise.",
  },
  {
    number: "05",
    title: "Time",
    subtitle: "reveals quality.",
  },
];

export default function AboutPrinciples() {
  return (
    <Section customPadding="py-56">
      <Container>

        <motion.div
          {...fadeUp}
          className="mb-28"
        >
          <Eyebrow>
            Constitution
          </Eyebrow>
        </motion.div>

        <div className="border-t border-white/10">

          {principles.map((principle) => (
            <motion.article
              key={principle.number}
              {...fadeUp}
              className="
                grid
                grid-cols-12
                border-b
                border-white/10
                py-16
              "
            >

              <div className="col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-white/30">
                  {principle.number}
                </p>
              </div>

              <div className="col-span-10">

                <Display className="max-w-4xl">
                  {principle.title}
                  <br />
                  {principle.subtitle}
                </Display>

              </div>

            </motion.article>
          ))}

        </div>

      </Container>
    </Section>
  );
}