"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface HoverCardProps {
  children: ReactNode;
}

export default function HoverCard({
  children,
}: HoverCardProps) {
  return (
    <motion.div
      initial={false}
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      {children}
    </motion.div>
  );
}