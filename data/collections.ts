import { Collection } from "@/types/collection";

export const collections: Collection[] = [
  {
    id: 1,
    slug: "residence",

    code: "H11-001",

    chapter: "Chapter I",
    roman: "I",
    title: "Residence",
    season: "FW26",
    subtitle: "A study of quiet confidence.",
    year: "2026",

    isCurrent: true,

    image: "/collection1.jpg",
    heroImage: "/collection1.jpg",

    description:
      "A study in monochrome silhouettes, precision tailoring, and elevated everyday essentials.",

    story:
      "Residence explores restraint through premium fabrics, architectural proportions, and timeless forms.",

    quote:
      "Luxury isn't louder. It's more intentional.",

    gallery: [
      "/collection1.jpg",
      "/collection2.jpg",
      "/collection3.jpg",
    ],

pieces: [
  {
    code: "H11-001",
    name: "Wool Overcoat",
    category: "Outerwear",
    chapter: "Residence",
    season: "FW26",
    description: "A study in structure and restraint.",
    image: "/collection1.jpg",
  },
  {
    code: "H11-002",
    name: "Double Pleated Trouser",
    category: "Trousers",
    chapter: "Residence",
    season: "FW26",
    description: "Relaxed precision for everyday ritual.",
    image: "/collection2.jpg",
  },
  {
    code: "H11-003",
    name: "Heavyweight Tee",
    category: "Essentials",
    chapter: "Residence",
    season: "FW26",
    description: "Essential form without distraction.",
    image: "/collection3.jpg",
  },
  {
    code: "H11-004",
    name: "Relaxed Oxford Shirt",
    category: "Shirting",
    chapter: "Residence",
    season: "FW26",
    description: "Soft structure with understated confidence.",
    image: "/collection1.jpg",
  },
  {
    code: "H11-005",
    name: "Wide Leg Trouser",
    category: "Trousers",
    chapter: "Residence",
    season: "FW26",
    description: "Designed for movement without excess.",
    image: "/collection2.jpg",
  },
  {
    code: "H11-006",
    name: "Leather Weekender",
    category: "Accessories",
    chapter: "Residence",
    season: "FW26",
    description: "A companion for journeys worth remembering.",
    image: "/collection3.jpg",
  },
],
  },
  

  {
    id: 2,
    slug: "presence",

    code: "H11-002",

    chapter: "Chapter II",
    roman: "II",
    title: "Presence",
    season: "SS27",
    subtitle: "Confidence without noise.",
    year: "2027",

    isCurrent: false,

    image: "/collection2.jpg",
    heroImage: "/collection2.jpg",

    description:
      "Sharp construction softened by contemporary silhouettes.",

    story:
      "Presence celebrates craftsmanship while embracing the relaxed confidence of modern streetwear.",

    quote:
      "Confidence is found in restraint.",

    gallery: [
      "/collection2.jpg",
      "/collection1.jpg",
      "/collection3.jpg",
    ],

    pieces: [],
  },

  {
    id: 3,
    slug: "intention",

    code: "H11-003",

    chapter: "Chapter III",
    roman: "III",
    title: "Intention",
    season: "FW27",
    subtitle: "Nothing exists without purpose.",
    year: "2027",

    isCurrent: false,

    image: "/collection3.jpg",
    heroImage: "/collection3.jpg",

    description:
      "Every silhouette is deliberate. Every proportion is intentional.",

    story:
      "Intention focuses on disciplined design, refined simplicity, and purposeful construction.",

    quote:
      "Everything begins with intention.",

    gallery: [
      "/collection3.jpg",
      "/collection2.jpg",
      "/collection1.jpg",
    ],

    pieces: [],
  },
];