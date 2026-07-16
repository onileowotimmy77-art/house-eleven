export interface CollectionPiece {
  code: string;

  name: string;

  category: string;

  chapter: string;

  season: string;

  description: string;

  image: string;
}

export interface Collection {
  id: number;

  slug: string;

  code: string;

  chapter: string;
  title: string;
  season: string;
  subtitle: string;
  year: string;
  roman: string;

  isCurrent: boolean;

  image: string;
  heroImage: string;

  description: string;
  story: string;
  quote: string;

  gallery: string[];

  pieces: CollectionPiece[];
}