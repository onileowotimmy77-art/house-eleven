import { notFound } from "next/navigation";

import { getProduct } from "@/src/data/getProduct";

import ProductHero from "./hero/ProductHero";
import ProductStory from "./story/ProductStory";
import ProductCraftsmanship from "./craftsmanship/ProductCraftsmanship";
import ProductSpecs from "./specs/ProductSpecs";
import ProductGallery from "./gallery/ProductGallery";
import ProductAcquisition from "./acquisition/ProductAcquisition";
import ProductFinale from "./finale/ProductFinale";



interface ProductPageProps {
  slug: string;
}

export default function ProductPage({
  slug,
}: ProductPageProps) {

  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductHero product={product} />

<ProductStory product={product} />

<ProductGallery product={product} />

<ProductCraftsmanship product={product} />

<ProductSpecs product={product} />

<ProductAcquisition product={product} />

<ProductFinale />
    </>
  );
}