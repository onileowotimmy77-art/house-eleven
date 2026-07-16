"use client";

import Image from "next/image";

interface GalleryImageProps {
  image: string;
  alt: string;
  aspect?: "landscape" | "portrait" | "square";
}

export default function GalleryImage({
  image,
  alt,
  aspect = "landscape",
}: GalleryImageProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-neutral-900

        ${
          aspect === "landscape"
            ? "aspect-[16/10]"
            : aspect === "portrait"
            ? "aspect-[4/5]"
            : "aspect-square"
        }
      `}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="
          object-cover
          
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-black/10
        "
      />
    </div>
  );
}