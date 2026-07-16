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
          Construction
        </Eyebrow>

        <Display className="mt-8 max-w-5xl">
          Nothing exists by accident.
        </Display>

        <div className="mt-20 grid gap-x-24 gap-y-20 lg:grid-cols-2">
          {product.craftsmanship.map((item, index) => (
            <div key={item.title}>
              <h3
                className="
                  text-[1.65rem]
                  font-semibold
                  
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
                {item.description}
              </p>

              {index < 2 && ( 

              <div className="mt-10 h-px w-16 bg-white/10" />
              )}
            </div>

          ))}
        </div>
      </Container>
    </Section>
  );
}