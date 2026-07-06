"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CursorLabel from "./CursorLabel";
import useCursor from "./useCursor";
import { useCursorContext } from "./CursorProvider";

export default function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);

  const { position } = useCursor();

const {
  hovering,
  label,
} = useCursorContext();

  useEffect(() => {
    if (!cursor.current) return;

    gsap.to(cursor.current, {
      x: position.x - 20,
      y: position.y - 20,
      duration: 0.18,
      ease: "power3.out",
    });
  }, [position]);

  useEffect(() => {
    if (!cursor.current) return;

    gsap.to(cursor.current, {
      scale: hovering ? 1.6 : 1,
      duration: 0.3,
      ease: "power3.out",
    });
  }, [hovering]);

  return (
    <div
      ref={cursor}
      className="
        fixed
        left-0
        top-0
        z-[9999]
        pointer-events-none
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-white/50
        bg-white/10
        shadow-[0_0_35px_rgba(255,255,255,0.08)]
        backdrop-blur-xl
      "
    >
      <div className="absolute h-1.5 w-1.5 rounded-full bg-white" />

      <CursorLabel label={label} />
    </div>
  );
}