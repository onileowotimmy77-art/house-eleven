"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import JournalContent from "./JournalContent";

import { fadeUp, imageReveal } from "@/lib/animations";

export default function JournalHero() {
  return (
    <Section
      customPadding="pt-44 pb-24 lg:pt-56 lg:pb-32"
      className="min-h-[75vh] flex items-center"
    >
      <Container>
        <div className="grid gap-20 lg:gap-28">
          <motion.div {...fadeUp}>
            <JournalContent />
          </motion.div>

          <motion.div
            {...imageReveal}
            className="relative overflow-hidden rounded-sm"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/editorial/journal-hero.jpg"
                alt="House Eleven Journal"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}