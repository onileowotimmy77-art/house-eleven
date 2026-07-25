"use client";

import { motion } from "framer-motion";

import SectionHeader from "@/components/ui/SectionHeader";
import useEntranceReveal from "@/components/entrance/useEntranceReveal";

export default function ManifestoHeader() {
  const {
    ref,
    revealed,
    cinematic,
  } = useEntranceReveal();

  return (
    <div
      id="manifesto-header" 
      ref={ref}>
      <motion.div
        initial={{
          opacity: 0,
          y: cinematic ? 120 : 50,
        }}
        animate={
          revealed
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: cinematic ? 120 : 50,
              }
        }
        transition={{
          duration: cinematic ? 1.6 : 0.9,
          delay: cinematic ? 0.45 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <SectionHeader
          eyebrow="Manifesto"
          title="Second To None."
          description="House Eleven exists for those who move first. Every garment is designed with intention, crafted with restraint, and created to outlive trends."
        />
      </motion.div>
    </div>
  );
}