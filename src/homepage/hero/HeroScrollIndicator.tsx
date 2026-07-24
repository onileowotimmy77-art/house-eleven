"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Entrance from "../../../components/motion/Entrance";
import { useEntrance } from "@/components/entrance/EntranceProvider";

export default function HeroScrollIndicator() {
  const [hidden, setHidden] = useState(false);
  const { entranceState } = useEntrance();
  
  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Entrance delay={1.6}>
      <motion.div
        animate={{
          opacity: hidden ? 0 : 1,
          y: hidden ? 30 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          bottom-10 lg:bottom-12
          left-1/2
          z-30
          -translate-x-1/2
        "
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: [0.76, 0, 0.24, 1],
          }}
          className="flex flex-col items-center gap-4"
        >
          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.45em]
              text-white/40
            "
          >
            SCROLL
          </span>

          <div className="relative h-12 w-px overflow-hidden bg-white/20">
            <motion.div
              animate={{
                y: [0, 10],
                opacity: [0.45, 1],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: [0.76, 0, 0.24, 1],
              }}
              className="
                absolute
                left-1/2
                h-2
                w-2
                -translate-x-1/2
                rounded-full
                bg-white
              "
            />
          </div>
        </motion.div>
      </motion.div>
    </Entrance>
  );
}