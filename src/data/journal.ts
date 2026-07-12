export interface JournalEntry {
  slug: string;

  volume: string;

  title: string;

  excerpt: string;

  date: string;

  readTime: string;

  image: string;
}

export const journal: JournalEntry[] = [
  {
    slug: "meaning-of-residence",

    volume: "Volume 01",

    title: "The Meaning of Residence",

    excerpt:
      "An exploration of quiet confidence, proportion, and the philosophy behind our first chapter.",

    date: "July 2026",

    readTime: "5 min",

    image: "/journal/residence.jpg",
  },

  {
    slug: "designing-for-longevity",

    volume: "Volume 02",

    title: "Designing for Longevity",

    excerpt:
      "Why timeless garments begin with intentional construction rather than seasonal trends.",

    date: "Coming Soon",

    readTime: "—",

    image: "/journal/longevity.jpg",
  },

  {
    slug: "inside-chapter-01",

    volume: "Volume 03",

    title: "Inside Chapter 01",

    excerpt:
      "A closer look at the ideas, imagery, and process that shaped Residence.",

    date: "Coming Soon",

    readTime: "—",

    image: "/journal/chapter01.jpg",
  },
];
