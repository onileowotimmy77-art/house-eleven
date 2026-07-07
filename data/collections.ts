import { Collection } from "@/types/collection";

export const collections: Collection[] = [
  {
    id: 1,
    slug: "noir",

    code: "H11-001",

    title: "NOIR",
    season: "FW26",
    subtitle: "The first chapter of House Eleven.",

    image: "/collection1.jpg",
    heroImage: "/collection1.jpg",

    description:
      "A study in monochrome silhouettes, precision tailoring, and elevated everyday essentials.",

    story:
      "NOIR explores restraint through premium fabrics, architectural proportions, and timeless forms.",

    quote:
      "Luxury isn't louder. It's more intentional.",

    gallery: [
      "/collection1.jpg",
      "/collection2.jpg",
      "/collection3.jpg",
    ],
  },

  {
    id: 2,
    slug: "atelier",

    code: "H11-002",

    title: "ATELIER",
    season: "SS27",
    subtitle: "Where tailoring meets street culture.",

    image: "/collection2.jpg",
    heroImage: "/collection2.jpg",

    description:
      "Sharp construction softened by contemporary silhouettes.",

    story:
      "ATELIER celebrates craftsmanship while embracing the relaxed confidence of modern streetwear.",

    quote:
      "Every garment begins with intention.",

    gallery: [
      "/collection2.jpg",
      "/collection1.jpg",
      "/collection3.jpg",
    ],
  },

  {
    id: 3,
    slug: "resort",

    code: "H11-003",

    title: "RESORT",
    season: "SS27",
    subtitle: "Quiet luxury built for movement.",

    image: "/collection3.jpg",
    heroImage: "/collection3.jpg",

    description:
      "Lightweight textures, relaxed tailoring, and effortless elegance.",

    story:
      "RESORT focuses on freedom, comfort, and refined simplicity for everyday wear.",

    quote:
      "Confidence is found in simplicity.",

    gallery: [
      "/collection3.jpg",
      "/collection2.jpg",
      "/collection1.jpg",
    ],
  },
];