"use client";

import { motion } from "framer-motion";

import HeroBackground from "@/components/hero/HeroBackground";
import HeroContent from "@/components/hero/HeroContent";
import HeroImage from "@/components/hero/HeroImage";
import HeroOverlay from "@/components/hero/HeroOverlay";
import HeroScrollIndicator from "@/components/hero/HeroScrollIndicator";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        delay: 1.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      <HeroBackground />

      <div className="relative z-20 mx-auto max-w-[1600px] px-8 lg:px-16 xl:px-24">
        <div
          className="
            flex
            min-h-screen
            items-center
            gap-16
            py-32

            flex-col

            lg:flex-row
          "
        >
          <div className="w-full lg:w-[42%]">
            <HeroContent />
          </div>

          <div className="w-full lg:w-[58%]">
            <HeroImage />
          </div>
        </div>
      </div>

      <HeroOverlay />

      <HeroScrollIndicator />
    </motion.section>
  );
}