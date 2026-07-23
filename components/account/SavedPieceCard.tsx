"use client";

import Link from "next/link";
import Image from "next/image";

interface SavedPieceCardProps {
  image: string;
  name: string;
  collection: string;
  price: string;
  href: string;
}

export default function SavedPieceCard({
  image,
  name,
  collection,
  price,
  href,
}: SavedPieceCardProps) {
  return (
    <Link
      href={href}
      className="group block"
    >
      {/* Image */}

      <div
        className="
          relative
          aspect-[4/5]
          overflow-hidden
          bg-white/[0.03]
        "
      >
        <Image
          src={image}
          alt={name}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-[1.02]
          "
        />
      </div>

      {/* Information */}

      <div className="mt-8">

        <p
          className="
            font-mono
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-white/35
          "
        >
          {collection}
        </p>

        <h2
          className="
            mt-4
            text-[1.4rem]
            font-medium
            tracking-[-0.03em]
          "
        >
          {name}
        </h2>

        <p
          className="
            mt-3
            text-white/55
          "
        >
          {price}
        </p>

      </div>

    </Link>
  );
}