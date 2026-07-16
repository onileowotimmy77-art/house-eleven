"use client";

import Magnetic from "@/components/motion/Magnetic";
import useCursorTarget from "@/components/cursor/useCursorTarget";
import { useMenu } from "./MenuProvider";

export default function NavButton() {
  const cursor = useCursorTarget("MENU");
  const { toggleMenu } = useMenu();

  return (
    <Magnetic>
      <button
        {...cursor}
        onClick={toggleMenu}
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
        MENU
      </button>
    </Magnetic>
  );
}