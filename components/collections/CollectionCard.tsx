"use client";

import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import HoverCard from "@/components/motion/HoverCard";
import { useCursorContext } from "@/components/cursor/CursorProvider";
import { Collection } from "@/types/collection";
import Link from "next/link";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({
  collection,
}: CollectionCardProps) {
  const { 
    image, 
    code, 
    title, 
    slug, 
} = collection;
  
  const {
    setHovering, 
    setLabel,
  } = useCursorContext();

  return (
    <Reveal>
      <HoverCard>
        <Link href={`/collections/${slug}`}>
          <article 
              className="mb-40 group cursor-none"
            
              onMouseEnter={() => {
                setHovering(true);
                setLabel("READ");
              }}
            onMouseLeave={() => {
              setHovering(false);
              setLabel("");
            }}
            >
          <div   
            className="
              relative
              aspect-[4/5]
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
              sizes="(max-width: 768px) 100vw, 92vw"
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

            <div className="mt-10 flex items-end justify-between">
            <div>
              <p
                className="
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.4em]
                  text-white/35
                  transition-transform
                  duration-500
                  group-hover:-translate-y-1
                "
              >
                {code}
              </p>

              <h3
                className="
                  mt-3
                  text-4xl
                  font-black
                  uppercase
                  tracking-[-0.04em]
                  transition-transform
                  duration-500
                  group-hover:-translate-y-1
                "
              >
                {title}
              </h3>
            </div>

           <span
             className="
             font-mono
             text-xs
             uppercase
             tracking-[0.4em]
             text-white/35
             transition-transform
             duration-500
             group-hover:-translate-y-1
             "
             >
              Read Collection 
            </span>
            </div>
          </article>
        </Link>
      </HoverCard>
    </Reveal>
  );

}