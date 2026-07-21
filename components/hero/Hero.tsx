"use client";

import HeroContent from "./HeroContent";
import HeroMedia from "./HeroMedia";
import HeroScrollIndicator from "./HeroScrollIndicator";

export default function Hero() {
  return (
    <section
      className="
        relative
        isolate
        min-h-dvh
        
        overflow-hidden
      "
    >
      <HeroMedia />

      {/* Hero Frame */}
      <div
        className="
          absolute
          inset-0
          z-10
          flex
          flex-col
          
        "
      >
        <HeroContent />

        <HeroScrollIndicator />
      </div>
    </section>
  );
}