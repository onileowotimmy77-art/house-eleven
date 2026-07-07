"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function CollectionHeader() {
  return (
    <motion.div
      {...fadeUp}
      className="
      mx-auto
      mb-24 
      flex
      max-w-3xl
      flex-col
      items-center
      text-center
      "
    >
      <p className="font-mono text-xs uppercase tracking-[0.45em] text-white/40">
        Collections
      </p>

      <h2
        className="
          mt-6
          text-[clamp(4rem,9vw,8rem)]
          font-black
          uppercase
          leading-[0.88]
          tracking-[-0.06em]
        "
      >
        CHAPTER 01
      </h2>

      <p className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
        FW26
      </p>

      <p 
        className="
           mx-auto
           mt-10 
           max-w-2xl 
           text-lg 
           leading-8 
           text-white/60
           item-center
           text-center
           "
        >
        Every chapter tells a different story. The first collection introduces
        House Eleven through restrained silhouettes, refined craftsmanship and
        timeless essentials designed for modern everyday life.
      </p>
    </motion.div>
  );
}