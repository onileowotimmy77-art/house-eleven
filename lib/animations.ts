import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fade: Variants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      duration: 0.9,
    },
  },
};

export const stagger = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.06,
  },

  show: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};