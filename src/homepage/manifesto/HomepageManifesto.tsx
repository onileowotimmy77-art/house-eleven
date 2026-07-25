"use client";

import { motion } from "framer-motion";

import { Body, Editorial } from "@/components/ui/typography";

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

          <motion.div
  initial={{
    width: 0,
    opacity: 0,
  }}
  animate={
    revealed
      ? {
          width: 96,
          opacity: 1,
        }
      : {
          width: 0,
          opacity: 0,
        }
  }
  transition={{
    duration: 0.9,
    delay: cinematic ? 1.15 : 0.2,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    mx-auto
    mb-6
    h-px
    bg-white/10
  "
/>

          <Body
            className="
              
              text-[30px]
              leading-[2.2]
              tracking-[0.02em]
              text-white/70
            "
          >
            <>
              This is more than clothing.
              <br />
              <br />
              It is a house built
              <br />
              for those creating lives of purpose.
            </>
          </Body>

        </div>
      </motion.div>
    </div>
  );
}