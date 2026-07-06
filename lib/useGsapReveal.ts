"use client";

import { useLayoutEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGsapReveal(
  ref: RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}