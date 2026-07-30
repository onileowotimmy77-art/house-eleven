"use client";

import { useState } from "react";

import { navItems } from "./navItems";

import ConciergeLink from "./ConciergeLink";
import ConciergeEditorialPanel from "./ConciergeEditorialPanel";

export default function ConciergeNavigation() {
  const [activeItem, setActiveItem] = useState(
    navItems[0]
  );

  return (
    <div
      className="
        grid
        h-full
        grid-cols-12
        gap-12
        items-center
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