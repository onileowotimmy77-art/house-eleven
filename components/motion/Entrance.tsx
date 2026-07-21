"use client";

import { motion } from "framer-motion";
import { useAppTransition } from "../providers/AppTransitionProvider";
import { MotionDuration } from "@/lib/animation/token";

interface EntranceProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}

export default function Entrance({
  
  children,
  delay = 0,
  y = 28,
}: EntranceProps) {
  const { ready } = useAppTransition();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
      }}
      animate={{
  opacity: ready ? 1 : 0,
  y: ready ? 0 : y,
}}
      transition={{
        duration: MotionDuration.standard,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}