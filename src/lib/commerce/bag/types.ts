export interface BagItem {
  productSlug: string;

  size: string;

  quantity: number;
}

export interface Bag {
  items: BagItem[];
}