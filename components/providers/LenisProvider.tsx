"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

import { useMenu } from "@/components/navigation/MenuProvider";

import {
  registerLenis,
  unregisterLenis,
} from "@/lib/lenis";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({
  children,
}: LenisProviderProps) {
  const { isMenuOpen } = useMenu();

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Register globally
    registerLenis(lenis);

    let frame: number;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);

      unregisterLenis();

      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;

    if (isMenuOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isMenuOpen]);

  return <>{children}</>;
}