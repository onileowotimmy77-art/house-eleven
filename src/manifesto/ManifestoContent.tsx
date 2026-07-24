"use client";

import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";

export default function ManifestoContent() {
  return (
    <Stagger className="relative z-20 w-full max-w-lg pt-24 lg:w-[44%]">

      <Reveal>
        <div
          className="
            pointer-events-none
            absolute
            left-[-340px]
            top-[-130px]
            -z-10
            -translate-y-1/2
            select-none
            text-[18rem]
            font-black
            uppercase
            tracking-[-0.08em]
            text-white/[0.025]
          "
        >
          HOUSE
        </div>
      </Reveal>

      <Reveal>
        <p className="font-mono uppercase tracking-[0.45em] mt-10 text-white/40">
          HOUSE ELEVEN MANIFESTO
        </p>
      </Reveal>

      <Reveal>
        <h2
          className="
            mt-16
            text-[clamp(4rem,10vw,9rem)]
            font-black
            uppercase
            leading-[0.85]
            tracking-[-0.06em]
          "
        >
          WE DON'T
          <br />
          FOLLOW
          <br />
          TRENDS.
        </h2>
      </Reveal>

      <Reveal>
        <p
          className="
            mt-16
            max-w-lg
            text-xl
            leading-9
            text-white/60
          "
        >
          House Eleven exists to create timeless garments and unforgettable
          stories. We believe clothing should outlive seasons, trends, and
          algorithms.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-5 flex items-center gap-6">
          <div className="h-px w-56 bg-white/20" />

          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">
            HOUSE ELEVEN
          </span>
        </div>
      </Reveal>

    </Stagger>
  );
}