"use client";

import { motion } from "framer-motion";

import SectionHeader from "@/components/ui/SectionHeader";
import { useEntrance } from "@/components/entrance/EntranceProvider";

export default function ManifestoHeader() {
  const { entranceState } = useEntrance();

  const entered =
    entranceState === "transitioning" ||
    entranceState === "entered";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 120,
      }}
      animate={
        entered
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0,
              y: 120,
            }
      }
      transition={{
        duration: 1.6,
        delay: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <SectionHeader
        eyebrow="Manifesto"
        title="Second To None."
        description="House Eleven exists for those who move first. Every garment is designed with intention, crafted with restraint, and created to outlive trends."
      />
    </motion.div>
  );
}