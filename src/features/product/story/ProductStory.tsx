"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow, Display, Body } from "@/components/ui/typography";

import type { Product } from "@/src/data/products";

interface ProductStoryProps {
  product: Product;
}

export default function ProductStory({
  product,
}: ProductStoryProps) {
  return (
    <Section padding="pt-56 pb-32 mt-23">
      <Container>
        <div className="max-w-5xl">
          <Eyebrow>
            The Story
          </Eyebrow>

          <Display className="mt-8">
            Every garment begins long before the first stitch.
          </Display>

          <Body
            className="
              mt-10
              max-w-3xl
              text-xl
              leading-9
              text-white/60
            "
          >
            {product.story}
          </Body>
        </div>
      </Container>
    </Section>
  );
}