"use client";

import { useEffect, useRef, useState } from "react";

const TOP_OFFSET = 8;
const HIDE_VIEWPORT_RATIO = 0.65;
const SCROLL_DELTA = 6;

export default function useNavbarVisibility() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const hideThreshold =
        window.innerHeight * HIDE_VIEWPORT_RATIO;

      const difference =
        currentScrollY - lastScrollY.current;

      // Top of page
      if (currentScrollY <= TOP_OFFSET) {
        setScrolled(false);
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      setScrolled(true);

      // Scrolling down
      if (
        difference > SCROLL_DELTA &&
        currentScrollY > hideThreshold
      ) {
        setVisible(false);
      }

      // Scrolling up
      if (difference < -SCROLL_DELTA) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    scrolled,
    visible,
  };
}