"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedResidence() {
  return (
    <section className="mb-50">

      {/* Campaign Image */}
      <div
        className="
          relative
          mt-3
          h-[120vh]
        
          overflow-hidden
          bg-neutral-900
        "
      >
        <Image
          src="/chapter01.jpg"
          alt="Residence Polo"
          fill
          priority
          className="
            object-cover
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-black/10
            to-transparent
          "
        />
      </div>

      {/* Editorial Content */}
      <div
        className="
          mt-20
          max-w-4xl
        
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
          Signature Piece
        </p>

        <h2
          className="
            mt-7
            text-[clamp(4.5rem,9vw,8rem)]
            font-black
            uppercase
            leading-[0.88]
            tracking-[-0.07em]
          "
        >
          Residence Polo
        </h2>

        <p
          className="
            mt-4
            font-mono
            text-xs
            uppercase
            tracking-[0.35em]
            text-white/35
            "
        >
            Chapter 01
        </p>
        <p
          className="
            mt-6
            max-w-3xl
            text-xl
            leading-9
            text-white/60
          "
        >
          Tailored for Him & Her. Designed as the defining garment
          of Chapter 01.
        </p>

        <Link
          href="/products/residence-polo"
          className="
            mt-10
            inline-flex
            items-center
            gap-3
            text-xs
            uppercase
            tracking-[0.45em]
            text-white/70
            transition-colors
            duration-300
            hover:text-white
          "
        >
          View
          <span>→</span>
        </Link>
      </div>

    </section>
  );
}