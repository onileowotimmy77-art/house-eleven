"use client";

import Link from "next/link";

import Magnetic from "@/components/motion/Magnetic";
import useCursorTarget from "@/components/cursor/useCursorTarget";

import NavLink from "./NavLink";
import { navItems } from "./navItems";

import { CursorLabels } from "@/lib/cursor";
import { useBagStore } from "@/src/lib/stores/useBagStore";

export default function NavLinks() {
  const cursor = useCursorTarget(
    CursorLabels.ENTER
  );

  const bagCount = useBagStore((state) =>
    state.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    )
  );

  return (
    <nav
      aria-label="Primary navigation"
      className="
        hidden
        lg:flex
        items-center
        gap-14
        xl:gap-16
      "
    >
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          cursor={item.cursor}
        />
      ))}

      <Magnetic>
        <Link
          href="/bag"
          {...cursor}
          className="
            group
            flex
            items-center
            gap-3

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
          <span>
            Bag
          </span>

          {bagCount > 0 && (
            <span
              className="
                font-mono
                text-[9px]
                tracking-[0.15em]

                text-white/30

                transition-colors
                duration-300

                group-hover:text-white/55
              "
            >
              {String(bagCount).padStart(
                2,
                "0"
              )}
            </span>
          )}
        </Link>
      </Magnetic>
    </nav>
  );
}