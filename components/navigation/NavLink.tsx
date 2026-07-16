"use client";

import Link from "next/link";

import Magnetic from "@/components/motion/Magnetic";
import useCursorTarget from "@/components/cursor/useCursorTarget";

interface NavLinkProps {
  href: string;
  label: string;
  cursor: string;
}

export default function NavLink({
  href,
  label,
  cursor,
}: NavLinkProps) {
  const cursorTarget = useCursorTarget(cursor);

  return (
    <Magnetic>
      <Link
        href={href}
        {...cursorTarget}
        className="
          uppercase
          text-[11px]
          font-medium
          tracking-[0.34em]
          text-white/45
          transition-colors
          duration-300
          hover:text-white/90
        "
      >
        {label}
      </Link>
    </Magnetic>
  );
}