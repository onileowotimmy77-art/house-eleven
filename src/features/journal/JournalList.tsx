"use client";

import Link from "next/link";

import EditorialSection from "@/components/editorial/EditorialSection";
import EditorialLink from "@/components/editorial/EditorialLink";
import { Body, Display, Eyebrow } from "@/components/ui/typography";

import { journal } from "@/src/data/journal";

export default function JournalList() {
  return (
    <EditorialSection>
      <div>
        {journal.map((entry) => (
          <article
            key={entry.slug}
            className="border-b border-white/10 py-16"
          >
            <Eyebrow>{entry.volume}</Eyebrow>

            <Display
        
              className="mt-6 max-w-4xl"
            >
              {entry.title}
            </Display>

            <Body className="mt-8 max-w-2xl text-white/60">
              {entry.excerpt}
            </Body>

            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">
                {entry.date} • {entry.readTime}
              </p>

              <EditorialLink
                href={`/journal/${entry.slug}`}
              >
                Read Volume
              </EditorialLink>
            </div>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}