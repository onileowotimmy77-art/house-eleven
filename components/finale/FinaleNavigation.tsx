"use client";

import Link from "next/link";

import { useCursorContext } from "@/components/cursor/CursorProvider";

const links = [
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "Residents",
    href: "/residents",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stfu_milooo?igsh=cjRzem9qOHpxMGsy&utm_source=qr",
    external: true,
  },
];

export default function FinaleNavigation() {
  const {
    setHovering,
    setLabel,
  } = useCursorContext();

  return (
    <nav
      aria-label="Footer Navigation"
      className="mt-28 flex flex-col items-center gap-8"
    >
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
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