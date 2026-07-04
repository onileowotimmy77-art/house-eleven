"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import HeroMetadata from "./HeroMetadata";

export default function HeroContent() {
  return (
    <div className="flex h-full flex-col justify-center">

     

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.35,
        }}
        className="
          mt-12
          max-w-[7ch]
          font-extrabold
          uppercase
          tracking-[-0.06em]
          leading-[0.88]
          text-[clamp(4rem,7vw,8rem)]
        "
      >
        EVERY
        <br />
        HOUSE
        <br />
        BEGINS
        <br />
        SOMEWHERE.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
        }}
        className="
          mt-10
          max-w-lg
          text-lg
          leading-8
          text-white/65
        "
      >
        A modern fashion and creative house built for the next generation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 0.7,
        }}
        className="mt-16"
      >
        <Button>
          ENTER THE HOUSE
        </Button>
      </motion.div>

    </div>
  );
}