"use client";

import Link from "next/link";
import { useState } from "react";

import useCursorTarget from "@/components/cursor/useCursorTarget";

import { CursorLabels } from "@/lib/cursor";

import { useBagStore } from "@/src/lib/stores/useBagStore";

import { navItems } from "./navItems";
import ConciergeLink from "./ConciergeLink";
import ConciergeEditorialPanel from "./ConciergeEditorialPanel";
import { useMenu } from "./MenuProvider";

export default function ConciergeNavigation() {
  const [activeItem, setActiveItem] = useState(
    navItems[0]
  );

  const { closeMenu } = useMenu();

  const bagCursor = useCursorTarget(
    CursorLabels.ENTER
  );

  const bagCount = useBagStore((state) =>
    state.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    )
  );

  function handleBagClick() {
    bagCursor.onClick();

    closeMenu();
  }

  return (
    <div
      className="
        grid
        h-full
        grid-cols-12
        items-center
        gap-12
        pb-3
      "
    >
      {/* Navigation */}

      <nav
        className="
          col-span-7
          flex
          h-full
          flex-col
          justify-evenly
        "
      >
        {navItems.map((item) => (
          <ConciergeLink
            key={item.href}
            item={item}
            active={
              activeItem.href === item.href
            }
            onHover={() =>
              setActiveItem(item)
            }
          />
        ))}

        {/* Bag */}

        <Link
          href="/bag"
          onClick={handleBagClick}
          onMouseEnter={
            bagCursor.onMouseEnter
          }
          onMouseLeave={
            bagCursor.onMouseLeave
          }
          className="
            group
            flex
            items-center
            justify-between

            border-b
            border-white/10

            py-5

            transition-opacity
            duration-500
          "
        >
          <h2
            className="
              text-[clamp(2rem,4vw,4.5rem)]
              font-semibold
              leading-[0.9]
              tracking-[-0.05em]

              text-white/30

              transition-all
              duration-500

              group-hover:text-white/80
            "
          >
            Bag
          </h2>

          {bagCount > 0 && (
            <span
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.35em]

                text-white/35

                transition-colors
                duration-300

                group-hover:text-white/60
              "
            >
              {String(
                bagCount
              ).padStart(2, "0")}
            </span>
          )}
        </Link>
      </nav>

      {/* Editorial Panel */}

      <div
        className="
          col-span-5
        "
      >
        <ConciergeEditorialPanel
          item={activeItem}
        />
      </div>
    </div>
  );
}