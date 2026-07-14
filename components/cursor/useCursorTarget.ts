"use client";

import { useCallback } from "react";
import { useCursorContext } from "./CursorProvider";

export default function useCursorTarget(label: string) {
  const { setHovering, setLabel } = useCursorContext();

  const onMouseEnter = useCallback(() => {
    setHovering(true);
    setLabel(label);
  }, [label, setHovering, setLabel]);

  const onMouseLeave = useCallback(() => {
    setHovering(false);
    setLabel("");
  }, [setHovering, setLabel]);

  return {
    onMouseEnter,
    onMouseLeave,
  };
}