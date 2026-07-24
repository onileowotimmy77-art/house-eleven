"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { }
import { useAppTransition } from "../../../components/providers/AppTransitionProvider";

export default function HeroMedia() {
  const { ready } = useAppTransition();

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{
        opacity: 0,
        scale: 1.04,
      }}
      animate={{
              opacity: ready ? 1 : 0,
              scale: ready? 1 : 1.04,
            }
      }
      transition={{
        duration: 2.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Image
        src="/hero.jpg"
        alt="House Eleven Chapter 01 Campaign"
        fill
        priority
        sizes="100vw"
        className="
          object-cover
          object-center
        
          select-none
          pointer-events-none
        "
      />

      {/* Left Editorial Light */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/56
          via-black/14
          to-transparent
          pointer-events-none
        "
      />

      {/* Bottom Grounding */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/72
          via-black/6
          to-transparent
          pointer-events-none
        "
      />

      {/* Cinematic Vignette */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,.16)_100%)]
          pointer-events-none
        "
      />

      {/* Transition Into Gallery */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-72
          bg-gradient-to-b
          from-transparent
          via-black/24
          to-black
          pointer-events-none
        "
      />
    </motion.div>
  );
}