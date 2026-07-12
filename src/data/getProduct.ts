import { products } from "./products";

export function getProduct(slug: string) {
  return products.find(
    (product) => product.slug === slug
  );
}
