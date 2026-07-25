"use client";

import { motion } from "framer-motion";

import { useEntrance } from "@/components/entrance/EntranceProvider";

export default function ManifestoJourneyIndicator() {
  const { entranceState } = useEntrance();

  // Only visitors who entered through the CTA
  if (entranceState !== "entered") {
    return null;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.8,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        right-0
        bottom-0

        flex
        flex-col
        items-center
        gap-4
      "
    >
      <motion.span
        animate={{
          opacity: [0.45, 1, 0.45],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          font-mono
          text-[10px]
          uppercase
          tracking-[0.45em]
          text-white/40
        "
      >
        SCROLL
      </motion.span>

      <div className="relative h-12 w-px overflow-hidden bg-white/20">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="
            absolute
            left-1/2
            h-2
            w-2
            -translate-x-1/2
            rounded-full
            bg-white
          "
        />
      </div>
    </motion.div>
  );
}