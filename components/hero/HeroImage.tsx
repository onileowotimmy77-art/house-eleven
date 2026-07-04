"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1.2,
        delay: .3,
      }}
      className="
        relative
        h-screen
        w-[92%]
        ml-auto
        overflow-hidden
      "
    >
      <Image
        src="/hero-placeholder.jpg"

        alt="House Eleven Campaign"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      
      <div className="absolute inset-0 bg-black/10" />
    </motion.div>
  );
}
