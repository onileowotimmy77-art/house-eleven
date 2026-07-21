"use client";

import Image from "next/image";

import EditorialSection from "@/components/editorial/EditorialSection";
import EditorialLink from "@/components/editorial/EditorialLink";
import { Eyebrow, Display, Body } from "@/components/ui/typography";

import type { JournalContent } from "@/src/data/journal-content";

interface JournalArticleProps {
  article: JournalContent;
}

export default function JournalArticle({
  article,
}: JournalArticleProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-7xl px-8 pb-24">
            <Eyebrow>{article.volume}</Eyebrow>

            <Display className="mt-8 max-w-5xl text-white">
              {article.title}
            </Display>

            <Body className="mt-8 text-white/70">
              {article.date} • {article.readTime}
            </Body>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <EditorialSection padding="py-56">
        <Body className="mx-auto max-w-3xl text-2xl leading-relaxed text-white/80">
          {article.introduction}
        </Body>
      </EditorialSection>

      {/* First Image */}
      <Section customPadding="py-45">
        <div className="relative mx-auto aspect-[16/9] max-w-7xl overflow-hidden">
          <Image
            src={article.gallery[0].image}
            alt={article.gallery[0].alt}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* First Paragraph */}
      <EditorialSection padding="xl">
        <Body className="mx-auto max-w-3xl text-xl leading-relaxed text-white/70">
          {article.body[0]}
        </Body>
      </EditorialSection>

      {/* Pull Quote */}
      <EditorialSection padding="lg">
        <blockquote className="mx-auto max-w-5xl text-center">
          <p className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1.1] tracking-[-0.04em]">
            “{article.quote}”
          </p>
        </blockquote>
      </EditorialSection>

      {/* Second Paragraph */}
      <EditorialSection padding="lg">
        <Body className="mx-auto max-w-3xl text-xl leading-relaxed text-white/70">
          {article.body[1]}
        </Body>
      </EditorialSection>

      {/* Second Image */}
      <section className="px-8">
        <div className="relative mx-auto aspect-[4/5] max-w-3xl overflow-hidden">
          <Image
            src={article.gallery[1].image}
            alt={article.gallery[1].alt}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Closing */}
      <EditorialSection padding="xl">
        <Body className="mx-auto max-w-3xl text-xl leading-relaxed text-white/70">
          {article.body[2]}
        </Body>
      </EditorialSection>

      {/* Continue */}
      <EditorialSection padding="pt-20 pb-56">
        <div className="border-t border-white/10 pt-16 text-center">
          <Eyebrow>Continue to</Eyebrow>

          <Display
           
            className="mt-6"
          >
            Chapter 01
          </Display>

          <Body className="mt-6 text-white/60">
            Residence
          </Body>

          <EditorialLink
            href="/collections/residence"
            className="mt-12 justify-center"
          >
            Explore the Chapter
          </EditorialLink>
        </div>
      </EditorialSection>
    </>
  );
}