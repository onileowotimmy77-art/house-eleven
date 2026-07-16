"use client";

import { useCursorContext } from "@/components/cursor/CursorProvider";

const links = [
  "Collections",
  "Journal",
  "Residents",
  "Instagram",
];

export default function FinaleNavigation() {
  const {
    setHovering,
    setLabel,
  } = useCursorContext();

  return (
    <div className="mt-28 flex flex-col items-center gap-8">
      {links.map((link) => (
        <button
          key={link}
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
            transition
            duration-300
            hover:text-white
          "
        >
          {link}
        </button>
      ))}
    </div>
  );
}