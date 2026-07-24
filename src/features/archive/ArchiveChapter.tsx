"use client";

import Link from "next/link";
import Image from "next/image";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

import {
  Display,
  Body,
  Eyebrow,
} from "@/components/ui/typography";

import ArchiveFrame from "./ArchiveFrame";
import ArchiveDivider from "./ArchiveDivider";

export default function ArchiveChapter() {
  return (
    <Section customPadding="pt-0 pb-56">
      <ArchiveFrame>
        <Reveal>
          <article className="mx-auto max-w-6xl">

            <Eyebrow>
              CHAPTER 01
            </Eyebrow>

            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <Display className="max-w-3xl">
                Residence
              </Display>

              <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-white/40">
                2026
              </p>
            </div>

           

            {/* Campaign Image */}

            <div className="relative aspect-[16/9] mt-28 overflow-hidden bg-white/[0.03] border border-white/10">
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/20">
                  Residence Campaign Photography
                </span>
              </div>

              {false && (
                <Image
                  src=""
                  alt="Residence Campaign"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Editorial */}

            <div className="mt-24 grid gap-20 lg:grid-cols-12">

              <div className="lg:col-span-7">
                <Body className="text-white/60">
                  Residence marked the beginning of House Eleven.
                  The inaugural chapter explored permanence through
                  disciplined proportions, considered materials and a
                  quieter expression of luxury.
                </Body>

                <Body className="mt-10 text-white/60">
                  Rather than chasing novelty, the collection focused
                  on creating garments intended to remain relevant long
                  after the season in which they were introduced.
                </Body>
              </div>

              <aside className="lg:col-span-4 lg:col-start-9">

                <Eyebrow>
                  Permanent Record
                </Eyebrow>

                <div className="mt-10 space-y-8">

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/30">
                      Collection
                    </p>

                    <p className="mt-2 text-white/80">
                      Residence
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/30">
                      Year
                    </p>

                    <p className="mt-2 text-white/80">
                      2026
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/30">
                      Journal
                    </p>

                    <p className="mt-2 text-white/80">
                      Volume 001
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/30">
                      Status
                    </p>

                    <p className="mt-2 text-white/80">
                      Preserved
                    </p>
                  </div>

                </div>
              </aside>

            </div>

            <ArchiveDivider className="my-20" />

            <Link
              href="/collections/residence"
            className="
                inline-flex
                items-center
                gap-3
                font-mono
                text-[11px]
                uppercase
                tracking-[0.45em]
                text-white/60
                transition-all
                duration-500
                hover:text-white
                group
              "
            >
              <span>Enter Collection</span>

              <span className="transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </Link>

          </article>
        </Reveal>
      </ArchiveFrame>
    </Section>
  );
}  