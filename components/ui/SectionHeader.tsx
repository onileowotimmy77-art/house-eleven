"use client";

import { motion } from "framer-motion";
import { Display, Eyebrow } from "@/components/ui/typography";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`
        mb-20
        text-center
        ${className}
      `}
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>


      {/* Title */}
      <motion.div className="mt-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Display>{title}</Display>
      </motion.div>

      {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.8,
          delay: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mx-auto
          mt-8
          max-w-lg
          text-center
          !text-center
          text-lg
          leading-8
          text-white/60
        "
      >
        {description}
  </motion.p>
)}
    </div>
  );
}