import { Variants } from "framer-motion";
import {
  MotionDuration,
  MotionEase,
} from "@/lib/motion";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: MotionDuration.standard,
      ease: MotionEase.standard,
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
      duration: MotionDuration.standard,
      ease: MotionEase.standard,
    },
  },
};

export const stagger: Variants = {
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
      duration: MotionDuration.slow,
      ease: MotionEase.standard,
    },
  },
};