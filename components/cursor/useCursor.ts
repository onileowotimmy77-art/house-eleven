"use client";

import { useEffect, useState } from "react";

export default function useCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [label, setLabel] = useState("");

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return {
    position,
    hovering,
    label,
    setHovering,
    setLabel,
  };
}