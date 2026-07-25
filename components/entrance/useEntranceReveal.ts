"use client";

import { useEffect, useRef, useState } from "react";
import { useEntrance } from "./EntranceProvider";

export default function useEntranceReveal() {
  const { entranceState } = useEntrance();

  const ref = useRef<HTMLDivElement | null>(null);

  const [revealed, setRevealed] = useState(false);

  // Reveal immediately if the user entered through the CTA.
  useEffect(() => {
    if (
      entranceState === "transitioning" ||
      entranceState === "entered"
    ) {
      setRevealed(true);
    }
  }, [entranceState]);

  // Otherwise reveal naturally when the section reaches the viewport.
  useEffect(() => {
    if (revealed || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [revealed]);

  return {
    ref,
    revealed,
    cinematic:
      entranceState === "transitioning" ||
      entranceState === "entered",
  };
}