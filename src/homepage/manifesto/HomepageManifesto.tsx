"use client";

import { motion } from "framer-motion";

import { Display } from "@/components/ui/typography";

import useEntranceReveal from "@/components/entrance/useEntranceReveal";

export default function HomepageManifesto() {
  const {
    ref,
    revealed,
    cinematic,
  } = useEntranceReveal();

  return (
    <div
      ref={ref}
      className="mt-24"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: cinematic ? 60 : 30,
        }}
        animate={
          revealed
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: cinematic ? 60 : 30,
              }
        }
        transition={{
          duration: cinematic ? 1.2 : 0.8,
          delay: cinematic ? 0.95 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-12 h-px w-24 bg-white/10" />

          <Display
            className="
              text-[clamp(2rem,3vw,3.75rem)]
              leading-[1.08]
              tracking-[-0.05em]
            "
          >
            <>
              This is more than clothing.
              <br />
              <br />
              It is a house
              <br />
              built for those
              <br />
              creating lives of purpose.
            </>
          </Display>

        </div>
      </motion.div>
    </div>
  );
}