"use client";

import { motion } from "framer-motion";

import HeroContent from "./HeroContent";
import HeroMedia from "./HeroMedia";
import HeroScrollIndicator from "./HeroScrollIndicator";

import { useEntrance } from "@/components/entrance/EntranceProvider";

export default function Hero() {
  const { entranceState } = useEntrance();

  const entering =
    entranceState === "transitioning" ||
    entranceState === "entered";

  return (
    <motion.section
      animate={{
        scale: entering ? 1.02 : 1,
      }}
      transition={{
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        isolate
        min-h-dvh
        overflow-hidden
      "
    >
      <HeroMedia />

      <motion.div
        animate={{
          opacity: entering ? 0 : 1,
          y: entering ? -80 : 0,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          inset-0
          z-10
          flex
          flex-col
        "
      >
        <HeroContent />

       
      </motion.div>
    </motion.section>
  );
}