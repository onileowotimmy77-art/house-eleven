export interface JournalContent {
  slug: string;

  volume: string;

  title: string;

  date: string;

  readTime: string;

  heroImage: string;

  introduction: string;

  body: string[];

  quote: string;

  gallery: {
    image: string;
    alt: string;
  }[];
}

export const journalContent: JournalContent[] = [
  {
    slug: "meaning-of-residence",

    volume: "Volume 01",

    title: "The Meaning of Residence",

    date: "July 2026",

    readTime: "5 min",

    heroImage: "/journal/residence.jpg",

    introduction:
      "Residence was never intended to be a collection. It began as an exploration of restraint—of how fewer decisions, made with greater intention, could create garments that remain relevant long after trends fade.",

    body: [
      "Every proportion was considered with longevity in mind. Rather than chasing seasonal silhouettes, we focused on shapes that feel natural today and timeless tomorrow.",

      "Material became equally important. Heavyweight cotton piqué was selected not because it was fashionable, but because it develops character through wear while maintaining its structure.",

      "The result is a garment that asks very little for attention yet rewards those who notice the details.",
    ],

    quote:
      "Quiet confidence never asks for attention. It is simply recognised.",

    gallery: [
      {
        image: "/journal/residence-1.jpg",
        alt: "Residence Campaign",
      },
      {
        image: "/journal/residence-2.jpg",
        alt: "Residence Fabric Detail",
      },
    ],
  },
];