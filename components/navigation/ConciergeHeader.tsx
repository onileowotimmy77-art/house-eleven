"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import useCursorTarget from "@/components/cursor/useCursorTarget";

import {
  CursorLabels,
} from "@/lib/cursor";

import {
  useBagStore,
} from "@/src/lib/stores/useBagStore";

import {
  useMenu,
} from "./MenuProvider";

const header = {
  hidden: {
    opacity: 0,
    y: -18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      delay: 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: -12,

    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ConciergeHeader() {
  const { closeMenu } = useMenu();

  const closeCursor = useCursorTarget(
    CursorLabels.CLOSE
  );

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
    <motion.header
      variants={header}
      className="
        flex
        h-16
        items-center
        justify-between
        pt-5
      "
    >
      <p
        className="
          text-[11px]
          uppercase
          tracking-[0.45em]
          text-white/30
        "
      >
        HOUSE ELEVEN
      </p>

      <div
        className="
          flex
          items-center
          gap-8
        "
      >
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
            gap-3

            text-[11px]
            uppercase
            tracking-[0.42em]

            text-white/40

            transition-colors
            duration-300

            hover:text-white
          "
        >
          <span>BAG</span>

          <span
            className="
              font-mono
              text-[10px]
              tracking-[0.25em]

              text-white/25

              transition-colors
              duration-300

              group-hover:text-white/50
            "
          >
            {String(
              bagCount
            ).padStart(2, "0")}
          </span>
        </Link>

        <span
          className="
            h-4
            w-px
            bg-white/10
          "
          aria-hidden="true"
        />

        <button
          {...closeCursor}
          onClick={closeMenu}
          className="
            flex
            items-center
            gap-3

            text-[11px]
            uppercase
            tracking-[0.42em]

            text-white/40

            transition-colors
            duration-300

            hover:text-white
          "
        >
          <span>CLOSE</span>

          <span
            className="
              font-mono
              text-[10px]
              tracking-[0.25em]
              text-white/25
            "
          >
            ESC
          </span>
        </button>
      </div>
    </motion.header>
  );
}