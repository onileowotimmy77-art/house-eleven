"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { stagger } from "@/lib/animations";

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export default function Stagger({
  children,
  className = "",
}: StaggerProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}