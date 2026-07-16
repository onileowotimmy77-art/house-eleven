"use client";

import Image from "next/image";

interface GalleryImageProps {
  image: string;
  title: string;
  featured?: boolean;
}

export default function GalleryImage({
  image,
  title,
  featured = false,
}: GalleryImageProps) {
  return (
    <div
      className={`
        relative
        w-full
        min-w-0
        overflow-hidden
        bg-neutral-900

        ${
          featured
            ? "h-[100vh]"
            : "aspect-[4/5]"
        }
      `}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="
          object-cover
          transition-transform
          duration-[1200ms]
          ease-out
          group-hover:scale-[1.025]

        "
      />

      <div
        className="
          absolute
          inset-0
          bg-black/15
          transition-colors
          duration-700
          group-hover:bg-black/5
        "
      />
    </div>
  );
}
