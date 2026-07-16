"use client";

import { motion } from "framer-motion";

const title = "HOUSE ELEVEN".split("");

export default function LoaderWordmark() {
  return (
    <div className="flex flex-col items-center">

      {/* Growing Line */}

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: 120,
          opacity: 1,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-10 h-px bg-white/40"
      />

      {/* Wordmark */}

      <div className="flex flex-wrap justify-center">

        {title.map((letter, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45 + index * 0.045,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              whitespace-pre
              font-black
              text-[clamp(3.5rem,9vw,7rem)]
              tracking-[-0.06em]
              uppercase
            "
          >
            {letter}
          </motion.span>
        ))}

      </div>

      {/* Tagline */}

      <motion.p
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.4,
          duration: 0.8,
        }}
        className="
          mt-10
          font-mono
          text-[11px]
          uppercase
          tracking-[0.45em]
          text-white/40
        "
      >
        SECOND TO NONE.
      </motion.p>

    </div>
  );
}