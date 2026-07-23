"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import HoverCard from "@/components/motion/HoverCard";
import { useCursorContext } from "@/components/cursor/CursorProvider";

export default function FeaturedResidence() {
  const { setHovering, setLabel } = useCursorContext();

  return (
    <section className="mb-50">
      <HoverCard>
        <Link
          href="/products/residence-polo"
          className="block"
          onMouseEnter={() => {
            setHovering(true);
            setLabel("VIEW");
          }}
          onMouseLeave={() => {
            setHovering(false);
            setLabel("");
          }}
        >
          {/* Campaign Image */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 1.08,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              mt-3
              h-[110vh]
              max-w-6xl
              overflow-hidden
              bg-neutral-900
            "
          >
            <motion.div
              whileHover={{
                scale: 1.025,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >
              <Image
                src="/chapter01.jpg"
                alt="Residence Polo"
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/50
                via-black/10
                to-transparent
              "
            />
          </motion.div>

          {/* Editorial Content */}
          <div
            className="
              mt-10
              max-w-4xl
            "
          >
            <h2
              className="
                mt-5
                text-[clamp(4.5rem,9vw,8rem)]
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.07em]
              "
            >
              Residence Polo
            </h2>

            <p
              className="
                mt-8
                max-w-2xl
                text-lg
                leading-8
                text-white/60
              "
            >
              Tailored for Him & Her. Designed as the defining garment
              of Chapter 01.
            </p>

            <div
              className="
                mt-10
                inline-flex
                items-center
                gap-3
                text-xs
                uppercase
                tracking-[0.45em]
                text-white/70
                transition-colors
                duration-300
                group-hover:text-white
              "
            >
              View Piece
              <span>→</span>
            </div>
          </div>
        </Link>
      </HoverCard>
    </section>
  );
}