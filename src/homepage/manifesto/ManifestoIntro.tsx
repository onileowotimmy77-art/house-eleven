"use client";

import FadeUp from "@/components/ui/FadeUp";
import Body from "@/components/ui/typography/Body";

export default function ManifestoIntro() {
  return (
    <FadeUp delay={0.2}>
      <div className="mx-auto mt-8 max-w-2xl">

        <Body className="text-center leading-[1.9]">
          House Eleven exists for people who believe
          what they wear should say something long before they speak.
          
        </Body>

        
      </div>
    </FadeUp>
  );
}