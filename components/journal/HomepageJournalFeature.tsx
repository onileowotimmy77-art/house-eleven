"use client";

import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import HoverCard from "@/components/motion/HoverCard";

import EditorialLink from "@/components/editorial/EditorialLink";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

import { journalContent } from "@/src/data/journal-content";

export default function HomepageJournalFeature() {
  const featuredIssue = journalContent[0];

  return (
    <Reveal>
      <HoverCard>
        <article className="mx-auto max-w-6xl">
          {/* Editorial Cover */}
          <div
            className="
              relative
              aspect-[16/10]
              overflow-hidden
            "
          >
            <Image
              src={featuredIssue.heroImage}
              alt={featuredIssue.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Editorial Information */}
          <div className="mt-12 max-w-3xl">
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
            >
              Read Issue
            </EditorialLink>
          </div>
        </article>
      </HoverCard>
    </Reveal>
  );
}