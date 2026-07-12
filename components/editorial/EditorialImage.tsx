"use client";

import Image from "next/image";

interface EditorialImageProps {
  src: string;
  alt: string;

  aspect?:
    | "landscape"
    | "portrait"
    | "square"
    | "hero";

  priority?: boolean;

  className?: string;
}

export default function EditorialImage({
  src,
  alt,
 aspect = "landscape",
  priority = false,
  className = "",
}: EditorialImageProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-neutral-900

        ${
          aspect === "hero"
            ? "h-screen"
            : aspect === "landscape"
            ? "aspect-[16/10]"
            : aspect === "portrait"
            ? "aspect-[4/5]"
            : "aspect-square"
        }

        ${className}
      `}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="
          object-cover
          transition-transform
          duration-1000
          ease-out
          hover:scale-[1.02]
        "
      />

      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}