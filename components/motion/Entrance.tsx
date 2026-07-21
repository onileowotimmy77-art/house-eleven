"use client";

import { motion } from "framer-motion";
import { useAppTransition } from "../providers/AppTransitionProvider";
import {
  MotionDuration,
  MotionEase,
} from "@/lib/motion";

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
        ease: MotionEase.standard,
      }}
    >
      {children}
    </motion.div>
  );
}