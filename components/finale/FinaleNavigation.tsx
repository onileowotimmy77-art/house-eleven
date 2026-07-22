"use client";

import Link from "next/link";

import { useCursorContext } from "@/components/cursor/CursorProvider";

import {
  finaleNavigation,
  socialNavigation,
} from "@/lib/navigation";

const links = [
  ...finaleNavigation,
  ...socialNavigation,
];

export default function FinaleNavigation() {
  const {
    setHovering,
    setLabel,
  } = useCursorContext();

  return (
    <nav
      aria-label="Finale Navigation"
      className="mt-28 flex flex-col items-center gap-8"
    >
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={
            link.external
              ? "noopener noreferrer"
              : undefined
          }
          onMouseEnter={() => {
            setHovering(true);
            setLabel("OPEN");
          }}
          onMouseLeave={() => {
            setHovering(false);
            setLabel("");
          }}
          className="
            text-sm
            uppercase
            tracking-[0.45em]
            text-white/40
            transition-colors
            duration-300
            hover:text-white
            focus:outline-none
            focus:text-white
          "
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}