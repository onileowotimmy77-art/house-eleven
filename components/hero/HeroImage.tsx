"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { imageReveal } from "@/lib/motion";

export default function HeroImage() {
  return (
    <motion.div
        {...imageReveal}
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
