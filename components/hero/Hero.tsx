"use client";

import HeroMedia from "./HeroMedia";
import HeroContent from "./HeroContent";
import HeroScrollIndicator from "./HeroScrollIndicator";


export default function Hero() {

  return (
    <section
      className="
        relative
        isolate
        min-h-[130vh]
        overflow-hidden
        
      "
    >
      {/* Background Campaign */}
      <HeroMedia />

      {/* Hero Content */}
      <div
        className="
          absolute
          mt-5
          inset-0
          z-10
          height: 100vh
        "
      >
        <HeroContent />
      </div>

      {/* Scroll Indicator */}
      <HeroScrollIndicator />
    </section>
  );
}