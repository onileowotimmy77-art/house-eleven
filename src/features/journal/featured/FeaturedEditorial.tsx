"use client";

"use client";

import Image from "next/image";

import EditorialSection from "@/components/editorial/EditorialSection";
import EditorialLink from "@/components/editorial/EditorialLink";

import {
  Display,
  Body,
  Eyebrow,
} from "@/components/ui/typography";

const featuredEssay = {
  volume: "FEATURED ESSAY",

  title: "The Residence Philosophy",

  excerpt:
    "Every house is remembered for what it chooses to preserve. Residence began not as a collection, but as an exploration of permanence, proportion, and the quiet confidence that outlives fashion.",

  date: "Volume 01",

  readTime: "5 MIN READ",

  href: "/journal/meaning-of-residence",

  image: "",
};

export default function FeaturedEditorial() {
  return (
    <EditorialSection padding="pt-56 pb-64">
      <div className="grid gap-24 lg:grid-cols-12 lg:items-center">
        {/* LEFT */}

        <div className="lg:col-span-5">
          <Eyebrow>
            {featuredEssay.volume}
          </Eyebrow>

          <Display
            className="
              mt-8
              max-w-xl
            "
          >
            {featuredEssay.title}
          </Display>

          <Body
            className="
              mt-10
              max-w-lg
              text-white/60
            "
          >
            {featuredEssay.excerpt}
          </Body>

          <div
            className="
              mt-20
              flex
              items-end
              justify-between
              gap-12
            "
          >
            <div>
              <p
                className="
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.45em]
                  text-white/40
                "
              >
                {featuredEssay.date}
              </p>

              <p
                className="
                  mt-3
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.45em]
                  text-white/25
                "
              >
                {featuredEssay.readTime}
              </p>
            </div>

            <EditorialLink href={featuredEssay.href}>
              Read Essay
            </EditorialLink>
          </div>
        </div>

        {/* RIGHT */}

        <div className="lg:col-span-7">
          <div
            className="
              relative
              aspect-[4/5]
              overflow-hidden
              border
              border-white/10
              bg-white/[0.03]
            "
          >
            {featuredEssay.image ? (
              <>
                <Image
                  src={featuredEssay.image}
                  alt={featuredEssay.title}
                  fill
                  quality={90}
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/12
                    via-transparent
                    to-transparent
                  "
                />
              </>
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  flex-col
                  items-center
                  justify-center
                  gap-5
                >
                  <div className="h-px w-20 bg-white/10" />

                  <span
                    className="
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.45em]
                      text-white/20
                    "
                  >
                    Editorial Photography
                  </span>

                  <div className="h-px w-20 bg-white/10" />
                </div>
              )}
          </div>
        </div>
      </div>
    </EditorialSection>
  );
}