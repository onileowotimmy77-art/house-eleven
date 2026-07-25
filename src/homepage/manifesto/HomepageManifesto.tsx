"use client";

import { motion } from "framer-motion";

import { Body,  } from "@/components/ui/typography";

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
      className="mt-2"
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

          <Body
            className="
              
              text-[25px]
              leading-[2.2]
              tracking-[0.02em]
              text-white/70
            "
          >
            
              This is more than clothing.
        
          </Body>

          <Body
            className="
              
              text-[25px]
              leading-[2.2]
              tracking-[0.02em]
              text-white/70
            "
          >
          It is a house built
              <br />
              for those creating lives of purpose.
          </Body>
        </div>
      </motion.div>
    </div>
  );
}