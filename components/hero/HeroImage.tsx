"use client";

import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

export default function HeroImage() {
  return (
    <Reveal>
     
        <div
          className="
            relative
            ml-auto
            h-[50vh]
            w-full
            overflow-hidden

            lg:h-[65vh]

            xl:w-[92%]
          "
        >
          <Image
            src="/hero-placeholder.jpg"
            alt="House Eleven Campaign"
            fill
            priority
            sizes="(max-width:1280px) 100vw, 58vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          <div className="absolute inset-0 bg-black/10" />
        </div>
      
    </Reveal>
  );
}