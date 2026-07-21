"use client";

import { motion } from "framer-motion";
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
    <EditorialSection
      padding="pt-56 pb-64"
    >
      <div className="grid gap-24 lg:grid-cols-12 lg:items-center">

        {/* LEFT */}

        <motion.div
        
          className="lg:col-span-5"
        >
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
              mt-16
              flex
              items-center
              justify-between
              gap-10
            "
          >
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
              <br />
              {featuredEssay.readTime}
            </p>

            <EditorialLink href={featuredEssay.href}>
              Read Essay
            </EditorialLink>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
         
          className="lg:col-span-7"
        >
          <div
            className="
              relative
              aspect-[4/5]
              overflow-hidden
              bg-white/[0.03]
              border
              border-white/10
            "
          >
            {featuredEssay.image ? (
              <Image
                src={featuredEssay.image}
                alt={featuredEssay.title}
                fill
                className="object-cover"
                sizes="50vw"
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                "
              >
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
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </EditorialSection>
  );
}