"use client";

import { motion } from "framer-motion";

import EditorialSection from "@/components/editorial/EditorialSection";

import {
  Display,
  Body,
  Eyebrow,
} from "@/components/ui/typography";


export default function ArchiveIntro() {
  return (
    <EditorialSection
      padding="pt-56 pb-24"
    >
      <motion.div
       
        className="max-w-4xl"
      >
        <Eyebrow>
          Archive
        </Eyebrow>

        <Display
          className="mt-8"
        >
          Every publication issued
          by the House is preserved here
          as part of its permanent editorial record.
        </Display>

        <Body
          className="
            mt-10
            max-w-2xl
            text-white/60
          "
        >
          Essays, observations and
          collections are preserved as
          a permanent editorial record
          documenting the evolution of
          House Eleven over time.
        </Body>
      </motion.div>
    </EditorialSection>
  );
}