"use client";

import Link from "next/link";

import Magnetic from "@/components/motion/Magnetic";
import useCursorTarget from "@/components/cursor/useCursorTarget";

export default function NavLogo() {
  const cursor = useCursorTarget("HOME");

  return (
    <Magnetic>
      <Link
        href="/"
        {...cursor}
        className="
          text-[12px]
          font-medium
          uppercase
          tracking-[0.42em]
          leading-none
          transition-all
          duration-500
          hover:opacity-80
        "
      >
        HOUSE ELEVEN
      </Link>
    </Magnetic>
  );
}