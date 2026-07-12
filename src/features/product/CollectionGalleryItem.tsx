"use client";

import Link from "next/link";

import GalleryImage from "./CollectionGalleryImage";
import GalleryInfo from "./CollectionGalleryInfo";
import HoverCard from "@/components/motion/HoverCard";
import Reveal from "@/components/motion/Reveal";

interface GalleryItemProps {
  title: string;
  description: string;
  price: string;
  image: string;
  href: string;

  featured?: boolean;

  availableColours?: number;
  availableFits?: string[];

  editorial?: boolean;
  eyebrow?: string;
  align?: "left" | "center";
}

export default function GalleryItem({
  title,
  description,
  price,
  image,
  href,
  featured = false,
  availableColours,
  availableFits,
  editorial = false,
  eyebrow,
  align = "left",
}: GalleryItemProps) {
  return (
    <Reveal>
      <HoverCard>
        <article
          className={featured ? "mx-auto max-w-[1400px]" : ""}
        >
          <Link href={href} className="block">
            <GalleryImage
              image={image}
              title={title}
              featured={featured}
            />

            <GalleryInfo
              title={title}
              description={description}
              price={price}
            
              availableColours={availableColours}
              availableFits={availableFits}
              editorial={editorial}
              eyebrow={eyebrow}
              align={align}
            />
          </Link>
        </article>
      </HoverCard>
    </Reveal>
  );
}