"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";

interface MagneticLinkProps {
  children: ReactNode;
}

export default function MagneticLink({
  children,
}: MagneticLinkProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x =
      e.clientX - rect.left - rect.width / 2;

    const y =
      e.clientY - rect.top - rect.height / 2;

    gsap.to(ref.current, {
      x: x * 0.12,
      y: y * 0.12,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      {children}
    </div>
  );
}