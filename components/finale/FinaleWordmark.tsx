"use client";

import Reveal from "@/components/motion/Reveal";

export default function FinaleWordmark() {
  return (
    <Reveal className="text-center">
      <h2
        className="
          font-black
          uppercase
          tracking-[-0.08em]
          leading-[0.82]
          text-[clamp(5rem,14vw,13rem)]
        "
      >
        HOUSE
        <br />
        ELEVEN
      </h2>

      <p className="mt-12 text-xl text-white/55">
        Second To None.
      </p>
    </Reveal>
  );
}