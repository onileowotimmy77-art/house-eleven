"use client";

import { useEffect, useRef, useState } from "react";

export default function useNavbarVisibility() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const HIDE_THRESHOLD = window.innerHeight * 0.65;
      // Top of page
      if (currentScrollY <= 8) {
        setScrolled(false);
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      setScrolled(true);

      // Scrolling down
      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > HIDE_THRESHOLD
      ) {
        setVisible(false);
      }

      // Scrolling up
      if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    scrolled,
    visible,
  };
}