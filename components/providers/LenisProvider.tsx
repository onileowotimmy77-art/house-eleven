"use client";

import { useEffect } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({
  children,
}: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}