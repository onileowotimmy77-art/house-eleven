"use client";

import clsx from "clsx";

interface CommerceDividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export default function CommerceDivider({
  className,
  orientation = "horizontal",
}: CommerceDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        orientation === "horizontal"
          ? "h-px w-full bg-white/10"
          : "h-full w-px bg-white/10",
        className
      )}
    />
  );
}