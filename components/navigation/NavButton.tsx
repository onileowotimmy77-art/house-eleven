"use client";

import Magnetic from "@/components/motion/Magnetic";
import useCursorTarget from "@/components/cursor/useCursorTarget";

export default function NavButton() {
  const cursor = useCursorTarget("ENTER");

  return (
    <Magnetic>
      <button
        {...cursor}
        className="
          rounded-full
          border
          border-white/15

          px-4
          py-2

          text-[10px]
          font-medium
          uppercase
          tracking-[0.4em]

          transition-all
          duration-500

          hover:border-white/30
          hover:bg-white/5
        "
      >
        ENTER
      </button>
    </Magnetic>
  );
}