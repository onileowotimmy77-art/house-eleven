"use client";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import GalleryImage from "./GalleryImage";

import type { Product } from "@/src/data/products";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [hero, left, right, finale] = product.gallery;

  return (
    <Section customPadding="py-56">

      {/* Campaign */}
      <GalleryImage
        image={hero.image}
        alt={hero.alt}
        aspect={hero.aspect}
      />

      <Container className="mt-56">

        <div className="grid gap-24 lg:grid-cols-2">

          <GalleryImage
            image={left.image}
            alt={left.alt}
            aspect={left.aspect}
          />

          <GalleryImage
            image={right.image}
            alt={right.alt}
            aspect={right.aspect}
          />

        </div>

      </Container>

      <div className="mt-56">

        <GalleryImage
          image={finale.image}
          alt={finale.alt}
          aspect={finale.aspect}
        />

      </div>

    </Section>
  );
}