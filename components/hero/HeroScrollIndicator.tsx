"use client";

import { motion } from "framer-motion";

export default function HeroScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.35, 1, 0.35],
        y: [0, 8, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/40">
          Scroll
        </span>

        <div className="h-12 w-px bg-white/30" />
      </div>
    </motion.div>
  );
}