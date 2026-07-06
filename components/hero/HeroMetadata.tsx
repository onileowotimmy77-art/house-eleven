"use client";

import Reveal from "@/components/motion/Reveal";

export default function HeroMetadata() {
  return (
    <Reveal>
      <div
        className="
          flex
          flex-wrap
          gap-6
          font-mono
          text-[11px]
          uppercase
          tracking-[0.35em]
          text-white/45
        "
      >
        <span>EST.2026</span>

        <span>H11-FDN-001</span>

        <span>FW26</span>
      </div>
    </Reveal>
  );
}