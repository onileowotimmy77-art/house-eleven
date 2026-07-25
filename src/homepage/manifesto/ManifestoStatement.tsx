"use client";

import { motion } from "framer-motion";

import Editorial from "@/components/ui/typography/Editorial";
import FadeUp from "@/components/ui/FadeUp";

import useEntranceReveal from "@/components/entrance/useEntranceReveal";

interface ManifestoStatementProps {
  children: React.ReactNode;
  index: number;
  alignment: string;
  cinematic: boolean;
}

export default function ManifestoStatement({
  children,
  index,
  alignment,
  cinematic,
}: ManifestoStatementProps) {
  const {
    ref,
    revealed,
    cinematic: cinematicEntrance,
  } = useEntranceReveal();

  if (!cinematic) {
    return (
      <FadeUp delay={0.2 + index * 0.15}>
        <div className={`max-w-2xl ${alignment}`}>
          <Editorial>{children}</Editorial>
        </div>
      </FadeUp>
    );
  }

  return (
    <div ref={ref}>
      <motion.div
        initial={{
          opacity: 0,
          y: cinematicEntrance ? 60 : 30,
        }}
        animate={
          revealed
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: cinematicEntrance ? 60 : 30,
              }
        }
        transition={{
          duration: cinematicEntrance ? 1.2 : 0.8,
          delay: cinematicEntrance
            ? 0.9 + index * 0.45
            : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className={`max-w-2xl ${alignment}`}>
          <Editorial>{children}</Editorial>
        </div>
      </motion.div>
    </div>
  );
}