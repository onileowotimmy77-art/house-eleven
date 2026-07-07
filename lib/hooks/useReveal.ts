"use client";

import { useLayoutEffect, RefObject } from "react";
import { getGSAP } from "@/lib/gsap/gsap";

export default function useReveal(
  ref: RefObject<HTMLElement | null>,
  options?: {
    y?: number;
    start?: string;
    duration?: number;
  }
) {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        opacity: 0,
        y: options?.y ?? 80,
        duration: options?.duration ?? 1.2,
        ease: "power4.out",

        scrollTrigger: {
          trigger: ref.current,
          start: options?.start ?? "top 82%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, options]);
}