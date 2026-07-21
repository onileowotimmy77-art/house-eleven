"use client";

import { motion } from "framer-motion";
import { useAppTransition } from "../providers/AppTransitionProvider";

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
      animate={
        ready
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: Mo,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}