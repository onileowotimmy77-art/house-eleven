"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ChapterTransitionProps {
  children: ReactNode;
}

export default function ChapterTransition({
  children,
}: ChapterTransitionProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}