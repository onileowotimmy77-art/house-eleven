"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow, Display } from "@/components/ui/typography";

import type { Product } from "@/src/data/products";

interface ProductCraftsmanshipProps {
  product: Product;
}

export default function ProductCraftsmanship({
  product,
}: ProductCraftsmanshipProps) {
  return (
    <Section padding="pt-32 pb-56 mt-25">
      <Container>
        <Eyebrow>
          Craftsmanship
        </Eyebrow>

        <Display className="mt-8 max-w-5xl">
          Every proportion, seam and silhouette is considered with intention.
        </Display>

        <div className="mt-15 grid gap-16 lg:grid-cols-3">
          {product.craftsmanship.map((item) => (
            <div key={item.title}>
              <h3
                className="
                  text-2xl
                  font-bold
                  uppercase
                  tracking-[-0.03em]
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-6
                  leading-8
                  text-white/60
                "
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}