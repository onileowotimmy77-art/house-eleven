"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import type { Product } from "@/src/data/products";

interface ProductAcquisitionProps {
  product: Product;
}

export default function ProductAcquisition({
  product,
}: ProductAcquisitionProps) {
  return (
    <Section padding="py-56">
      <Container>
        <div className="border-t border-white/10 pt-20">

          <p
            className="
              font-mono
              mt-10
              text-[11px]
              uppercase
              tracking-[0.4em]
              text-white/40
            "
          >
            Ready to Wear
          </p>

          <h2
            className="
              mt-6
              text-[clamp(3rem,7vw,6rem)]
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.05em]
            "
          >
            {product.name}
          </h2>

          <p
            className="
              mt-8
              text-3xl
              font-semibold
            "
          >
            {product.price}
          </p>

          <div
            className="
              mt-16
              flex
              flex-wrap
              gap-4
            "
          >
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className="
                  border
                  border-white/15
                  px-8
                  py-4
                  text-sm
                  uppercase
                  tracking-[0.3em]
                  transition-colors
                  duration-300
                  hover:border-white
                "
              >
                {size}
              </button>
            ))}
          </div>

          <button
            className="
              mt-20
              mb-20
              text-sm
              uppercase
              tracking-[0.35em]
              transition-opacity
              duration-300
              hover:opacity-60
            "
          >
            Acquire Piece →
          </button>

        </div>
      </Container>
    </Section>
  );
}