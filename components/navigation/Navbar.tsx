"use client";

import useNavbarVisibility from "@/lib/hooks/useNavbarVisibility";
import { motion } from "framer-motion";

import Container from "../layout/Container";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavButton from "./NavButton";

export default function Navbar() {
  const { scrolled, visible } = useNavbarVisibility();

  return (
    <motion.header
  initial={{
    y: -72,
    opacity: 0,
  }}
  animate={{
    y: visible ? 0 : -72,
    opacity: visible ? 1 : 0,
  }}
  transition={{
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
  }}
  className={`
    fixed
    inset-x-0
    top-0
    z-50
    w-full

    transition-[background-color,border-color,backdrop-filter]
    duration-300

    ${
      scrolled
        ? "bg-black/15 backdrop-blur-xl border-b border-white/5"
        : "bg-transparent border-b border-transparent"
    }
  `}
>
    

      <Container>
        <div
          className="
            flex
            items-center
            justify-between
            h-[55px]
          "
        >
          <NavLogo />

          <NavLinks />

          <NavButton />
        </div>
      </Container>
    </motion.header>
  );
}