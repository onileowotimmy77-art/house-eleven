"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/typography";

import type { Product } from "@/src/data/products";

interface ProductSpecsProps {
  product: Product;
}

export default function ProductSpecs({
  product,
}: ProductSpecsProps) {
  const specifications = [
    {
      label: "Material",
      value: product.material,
    },
    {
      label: "Fit",
      value: product.fit,
    },
    {
      label: "Colour",
      value: product.color,
    },
    {
      label: "Origin",
      value: product.madeIn,
    },
    {
      label: "Edition",
      value: product.edition,
    },
    {
      label: "Chapter",
      value: `${product.chapter} • ${product.collection}`,
    },
  ];

  return (
    <Section customPadding="py-48 mt-28">
      <Container>
        <Eyebrow>Details</Eyebrow>

        <div className="mt-12 border-t border-white/10">
          {specifications.map((spec) => (
            <div
              key={spec.label}
              className="
                flex
                flex-col
                gap-3
                border-b
                border-white/10
                py-10
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <span
                className="
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.35em]
                  text-white/40
                "
              >
                {spec.label}
              </span>

              <span
                className="
                  text-xl
                  font-medium
                  tracking-[-0.02em]
                  text-white
                "
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}