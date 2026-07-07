export interface Collection {
  id: number;
  slug: string;

  code: string;

  title: string;
  season: string;
  subtitle: string;

  image: string;
  heroImage: string;

  description: string;
  story: string;
  quote: string;

  gallery: string[];
}