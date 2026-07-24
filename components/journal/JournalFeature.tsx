"use client";

import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import HoverCard from "@/components/motion/HoverCard";
import EditorialLink from "@/components/ui/EditorialLink";

export default function JournalFeature() {
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
              src="/journal1.jpg"
              alt="Issue 001 — Why We Built House Eleven"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Editorial Information */}
          <div
            className="
              mt-12
              max-w-3xl
            "
          >
            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.45em]
                text-white/40
              "
            >
              Issue 001
            </p>

            <h2
              className="
                mt-5
                text-[clamp(4rem,8vw,7rem)]
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              Why We Built House Eleven
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
              House Eleven was never conceived as another clothing
              brand. It began with a single question: what happens
              when garments are treated with the same permanence as
              architecture? This first journal explores the ideas,
              philosophy and intentions that continue to shape every
              collection.
            </p>

            <div className="mt-12">
              <EditorialLink
                href="/journal"
                cursorLabel="READ"
              >
                Read the Journal
              </EditorialLink>
            </div>
          </div>
        </article>
      </HoverCard>
    </Reveal>
  );
}