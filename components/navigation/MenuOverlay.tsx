"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Container from "@/components/layout/Container";
import { useMenu } from "./MenuProvider";

const menuItems = [
  "Collections",
  "Manifesto",
  "Journal",
  "House",
];

export default function MenuOverlay() {
  const { isMenuOpen, closeMenu } = useMenu();

  const [activeItem, setActiveItem] = useState<string | null>(null);
  useEffect(() => {
  if (isMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [isMenuOpen]);

useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  };

  if (isMenuOpen) {
    window.addEventListener("keydown", handleKeyDown);
  }

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isMenuOpen, closeMenu]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            inset-0
            z-[100]
            bg-black
            text-white
          "
        >
          <Container>
            <div
              className="
                flex
                min-h-screen
                flex-col
                py-20
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <p
                  className="
                    font-mono
                    text-[11px]
                    uppercase
                    tracking-[0.4em]
                    text-white/35
                  "
                >
                  House Eleven
                </p>

                <button
                  onClick={closeMenu}
                  className="
                    font-bold
                    text-[11px]
                    uppercase
                    tracking-[0.4em]
                    text-white/35
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  Close
                </button>
              </div>

              {/* Navigation */}
              <div
                className="
                  flex
                  flex-1
                  items-center
                  justify-end
                "
              >
                <nav
                  className="
                    flex
                    flex-col
                    items-end
                  "
                >
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item}
                      onClick={closeMenu}
                      onMouseEnter={() => setActiveItem(item)}
                      onMouseLeave={() => setActiveItem(null)}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        py-2
                        text-right
                        text-[clamp(2.8rem,6vw,5.5rem)]
                        font-black
                        uppercase
                        leading-[0.95]
                        tracking-[-0.05em]
                      "
                    >
                      <span
                        className={`
                          transition-opacity
                          duration-500
                          ${
                            activeItem === null
                              ? "opacity-80"
                              : activeItem === item
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        `}
                      >
                        {item}
                      </span>
                    </motion.button>
                  ))}
                </nav>
              </div>
              {/* Footer */}
              <div
  className="
    flex
    items-center
    justify-between
    font-mono
    text-[11px]
    uppercase
    tracking-[0.35em]
    text-white/30
  "
>
  <span>Current Edition</span>

  <span
    className="
      transition-opacity
      duration-300
      hover:opacity-100
    "
  >
    *ESC
  </span>
</div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}