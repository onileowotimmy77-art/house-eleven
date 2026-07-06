export const fadeUp = {
  initial: {
    opacity: 0,
    y: 40,
  },

  whileInView: {
    opacity: 1,
    y: 0,
  },

  viewport: {
    once: true,
    amount: 0.25,
  },

  transition: {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
  },
};

export const fade = {
  initial: {
    opacity: 0,
  },

  whileInView: {
    opacity: 1,
  },

  viewport: {
    once: true,
  },

  transition: {
    duration: 0.8,
  },
};

export const imageReveal = {
  initial: {
    opacity: 0,
    scale: 1.08,
  },

  whileInView: {
    opacity: 1,
    scale: 1,
  },

  viewport: {
    once: true,
  },

  transition: {
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1],
  },
};