"use client";

import HeroBackground from "@/components/hero/HeroBackground";
import HeroContent from "@/components/hero/HeroContent";
import HeroImage from "@/components/hero/HeroImage";
import HeroOverlay from "@/components/hero/HeroOverlay";
import HeroScrollIndicator from "@/components/hero/HeroScrollIndicator";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section 
      initial={{ 
        opacity:0,
      }}
      animate={{ 
        opacity:1,
     }}
      transition={{ 
        duration:1,
        delay:1.8,
        ease:[0.22,1,0.36,1],
    }}
    
    
      className="relative min-h-screen overflow-hidden bg-black text-white">

      <HeroBackground />

      <div className="relative z-20 mx-auto max-w-[1600px] px-10 lg:px-16 xl:px-24">
        <div className="grid min-h-screen grid-cols-12">

          {/* LEFT */}
          <div className="col-span-5 flex items-center pr-20">
            <HeroContent />
          </div>

          {/* RIGHT */}
          <div className="col-span-7 flex justify-end">
            <HeroImage />
          </div>

        </div>
      </div>

      <HeroOverlay />

      <HeroScrollIndicator />

    </motion.section>
  );
}
