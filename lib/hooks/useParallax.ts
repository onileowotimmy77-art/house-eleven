"use client";

import { RefObject, useLayoutEffect } from "react";
import { getGSAP } from "@/lib/gsap/gsap";

export default function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed = 80
) {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: -speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, speed]);
}