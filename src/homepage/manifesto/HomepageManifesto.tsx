"use client";

import { motion } from "framer-motion";

import Editorial from "@/components/ui/typography/Editorial";
import useEntranceReveal from "@/components/entrance/useEntranceReveal";

export default function HomepageManifesto() {
  const {
    ref,
    revealed,
    cinematic,
  } = useEntranceReveal();

  return (
    <div ref={ref} className="mt-28">
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
          duration: cinematic ? 1.3 : 0.8,
          delay: cinematic ? 0.95 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <Editorial>
            <>
              House Eleven exists for those who move first.
              <br />
              We do not design for seasons.
              <br />
              We design for permanence.
              <br />
              <br />
              Every silhouette is intentional.
              <br />
              Every detail is deliberate.
              <br />
              Every chapter becomes part of a larger story.
              <br />
              <br />
              This is more than clothing.
              <br />
              <span className="italic">
                Welcome Home.
              </span>
            </>
          </Editorial>
        </div>
      </motion.div>
    </div>
  );
}