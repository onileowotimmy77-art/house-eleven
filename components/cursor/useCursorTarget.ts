"use client";

import { useCallback } from "react";
import { useCursorContext } from "./CursorProvider";
import { CursorLabel } from "@/lib/cursor";

export default function useCursorTarget(label: CursorLabel) {
  const {
    setHovering,
    setLabel,
  } = useCursorContext();

  const onMouseEnter = useCallback(() => {
    setHovering(true);
    setLabel(label);
  }, [label, setHovering, setLabel]);

  const onMouseLeave = useCallback(() => {
    setHovering(false);
    setLabel("");
  }, [setHovering, setLabel]);

  const onClick = useCallback(() => {
    // Immediately clear the cursor state so it
    // doesn't persist during navigation or scroll transitions.
    setHovering(false);
    setLabel("");
  }, [setHovering, setLabel]);

  return {
    onMouseEnter,
    onMouseLeave,
    onClick,
  };
}