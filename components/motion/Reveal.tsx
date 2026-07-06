"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export default function Reveal({
  children,
  className = "",
}: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}