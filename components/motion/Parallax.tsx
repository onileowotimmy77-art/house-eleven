"use client";

import { ReactNode, useRef } from "react";
import useParallax from "@/lib/hooks/useParallax";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function Parallax({
  children,
  speed = 80,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useParallax(ref, speed);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}