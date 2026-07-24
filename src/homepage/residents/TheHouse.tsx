"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import Reveal from "@/components/motion/Reveal";
import HoverCard from "@/components/motion/HoverCard";

import EditorialLink from "@/components/editorial/EditorialLink";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import { useCursorContext } from "@/components/cursor/CursorProvider";

export default function TheHouse() {
  const { setHovering, setLabel } = useCursorContext();

  return (
    <Reveal>
      <HoverCard>
        <Link
          href="/manifesto"
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
          <article className="group mx-auto max-w-6xl">

            {/* Editorial Image */}
            <div
              className="
                relative
                aspect-[16/10]
                overflow-hidden
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
                  src="/the-house.jpg"
                  alt="The House"
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Editorial Copy */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12 max-w-3xl"
            >
              <Eyebrow>
                THE HOUSE
              </Eyebrow>

              <Display className="mt-8">
                Its Residents Are Still Arriving
              </Display>

              <Body
                className="
                  mt-8
                  max-w-2xl
                  text-white/60
                "
              >
                House Eleven has been founded, but every House is
                shaped by the people who choose to build it. The
                photographers, models, artists, investors,
                designers and collaborators who define each chapter
                will become Residents as the story unfolds.
              </Body>

              <EditorialLink
                href="/manifesto"
                className="mt-12"
              
              >
                Read the Manifesto
              </EditorialLink>

            </motion.div>

          </article>
        </Link>
      </HoverCard>
    </Reveal>
  );
}