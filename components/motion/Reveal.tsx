"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { fadeUp } from "@/lib/animations";
import { MotionViewport } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
}

export default function Reveal({
  children,
  className = "",
  once = MotionViewport.once,
  amount = MotionViewport.amount,
}: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once,
        amount,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}