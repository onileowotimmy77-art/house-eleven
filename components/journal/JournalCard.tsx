"use client";

import Image from "next/image";

import HoverCard from "@/components/motion/HoverCard";
import Reveal from "@/components/motion/Reveal";
import { useCursorContext } from "@/components/cursor/CursorProvider";

interface JournalCardProps {
  image: string;
  title: string;
  category: string;
}

export default function JournalCard({
  image,
  title,
  category,
}: JournalCardProps) {
  const {
    setHovering,
    setLabel,
  } = useCursorContext();

  return (
    <Reveal>
      <HoverCard>
        <article
          onMouseEnter={() => {
            setHovering(true);
            setLabel("READ");
          }}
          onMouseLeave={() => {
            setHovering(false);
            setLabel("");
          }}
          className="group"
        >
          <div
            className="
              relative
              aspect-[16/10]
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              transition-all
              duration-500
              group-hover:border-white/20
            "
          >
            <Image
              src={image}
              alt={title}
              fill
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.05]
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <p
            className="
              mt-8
              font-mono
              text-[11px]
              uppercase
              tracking-[0.45em]
              text-white/40
              transition-transform
              duration-500
              group-hover:-translate-y-1
            "
          >
            {category}
          </p>

          <h3
            className="
              mt-4
              text-5xl
              font-black
              uppercase
              leading-none
              tracking-[-0.05em]
              transition-transform
              duration-500
              group-hover:-translate-y-1
            "
          >
            {title}
          </h3>

          <button
            className="
              mt-8
              text-xs
              uppercase
              tracking-[0.45em]
              text-white/50
              transition-colors
              duration-300
              hover:text-white
            "
          >
            Read Story →
          </button>
        </article>
      </HoverCard>
    </Reveal>
  );
}