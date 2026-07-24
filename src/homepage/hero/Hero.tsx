"use client";

import { motion } from "framer-motion";

import HeroContent from "./HeroContent";
import HeroMedia from "./HeroMedia";
import HeroScrollIndicator from "./HeroScrollIndicator";

import { useEntrance } from "@/components/entrance/EntranceProvider";

export default function Hero() {
  const { entranceState } = useEntrance();

  return (
    <motion.section
      animate={
        entranceState === "transitioning"
          ? {
              scale: 1.02,
            }
          : {
              scale: 1,
            }
      }
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

      <div
        className="
          absolute
          inset-0
          z-10
          flex
          flex-col
        "
      >
        <HeroContent />

        <HeroScrollIndicator />
      </div>
    </motion.section>
  );
}