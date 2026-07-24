"use client";

import Image from "next/image";

import { Collection } from "@/types/collection";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

interface CollectionCampaignProps {
  collection: Collection;
}

export default function CollectionCampaign({
  collection,
}: CollectionCampaignProps) {
  return (
    <Section customPadding="py-0">
      <Reveal>
        <div
          className="
            relative
            h-[100svh]
            w-full
            overflow-hidden
          "
        >
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill
            priority
            className="
              object-cover
              transition-transform
              duration-700
              hover:scale-[1.02]
            "
          />

          <div className="absolute inset-0 bg-black/10" />
        </div>
      </Reveal>
    </Section>
  );
}