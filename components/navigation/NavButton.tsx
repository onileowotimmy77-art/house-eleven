"use client";

import Button from "@/components/ui/Button";
import { useCursorContext } from "@/components/cursor/CursorProvider";

export default function NavButton() {
  const {
    setHovering,
    setLabel,
  } = useCursorContext();

  return (
    <Button
      onMouseEnter={() => {
        setHovering(true);
        setLabel("ENTER");
      }}
      onMouseLeave={() => {
        setHovering(false);
        setLabel("");
      }}
    >
      ENTER
    </Button>
  );
}