"use client";

import FadeUp from "@/components/ui/FadeUp";
import Editorial from "../ui/typography/Editorial";

export default function ManifestoClosing() {
  return (
    <FadeUp delay={0.6}>
      <div className="mb-28 text-center">
        <Editorial
          className="
            text-center
            text-[clamp(1.25rem,1.8vw,1.75rem)]
            font-normal
            tracking-[0.02em]
            text-white/80
          "
        >
          The House Awaits.
        </Editorial>
      </div>
    </FadeUp>
  );
}