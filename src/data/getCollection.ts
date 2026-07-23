import { products } from "./products";

export function getCollection(collection: string) {
  return products
    .filter((product) => product.collection === collection)
    .sort((a, b) => a.order - b.order);
}