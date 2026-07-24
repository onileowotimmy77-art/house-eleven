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

import { journalContent } from "@/src/data/journal-content";

export default function HomepageJournalFeature() {
  const featuredIssue = journalContent[0];

  const {
    setHovering,
    setLabel,
  } = useCursorContext();

  return (
    <Reveal>
      <HoverCard>
        <Link
          href={`/journal/${featuredIssue.slug}`}
          className="block"
          onMouseEnter={() => {
            setHovering(true);
            setLabel("READ");
          }}
          onMouseLeave={() => {
            setHovering(false);
            setLabel("");
          }}
        >
          <article className="group mx-auto max-w-6xl">

            {/* Editorial Cover */}
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
                  src={featuredIssue.heroImage}
                  alt={featuredIssue.title}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Editorial Information */}
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
                {featuredIssue.volume}
              </Eyebrow>

              <Display className="mt-8">
                {featuredIssue.title}
              </Display>

              <Body
                className="
                  mt-8
                  max-w-2xl
                  text-white/60
                  line-clamp-3
                "
              >
                {featuredIssue.introduction}
              </Body>

              <EditorialLink
                href={`/journal/${featuredIssue.slug}`}
                className="mt-12"
                cursorLabel="READ"
              >
                Read Issue
              </EditorialLink>
            </motion.div>

          </article>
        </Link>
      </HoverCard>
    </Reveal>
  );
}