"use client";

import { useEffect, useState } from "react";
import { MotionDelay } from "@/lib/motion";

export default function useIntroLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, MotionDelay.minimumLoader * 1000);

    return () => clearTimeout(timer);
  }, []);

  return loading;
}