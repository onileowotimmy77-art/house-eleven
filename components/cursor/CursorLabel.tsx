"use client";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  label: string;
}

export default function CursorLabel({
  label,
}: Props) {
  return (
    <AnimatePresence>
      {label && (
        <motion.span
          initial={{
            opacity: 0,
            scale: 0.6,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.6,
          }}
          transition={{
            duration: 0.18,
          }}
          className="
            text-[9px]
            uppercase
            tracking-[0.35em]
            text-white
            whitespace-nowrap
          "
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}