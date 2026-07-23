"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import HoverCard from "@/components/motion/HoverCard";
import { useCursorContext } from "@/components/cursor/CursorProvider";

export default function ChapterCampaign() {
  const { setHovering, setLabel } = useCursorContext();

  return (
    <HoverCard>
      <Link
        href="/collections/residence"
        className="block"
        onMouseEnter={() => {
          setHovering(true);
          setLabel("ENTER");
        }}
        onMouseLeave={() => {
          setHovering(false);
          setLabel("");
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          whileHover={{
            scale: 1.015,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            overflow-hidden
            cursor-pointer
          "
        >
          <div
            className="
              relative
              h-screen
              min-h-[700px]
              w-full
            "
          >
            <Image
              src="/chapter01.jpg"
              alt="House Eleven Residence Campaign"
              fill
              priority
              className="object-cover"
            />

            {/* Editorial Grounding */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/55
                via-black/10
                to-transparent
                pointer-events-none
              "
            />
          </div>
        </motion.div>
      </Link>
    </HoverCard>
  );
}