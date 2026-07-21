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
    <Section customPadding="py-56">
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
            Current Edition
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
              mt-10
              text-xl
              font-medium
              text-wgite/65
            "
          >
            {product.price}
          </p>

          <p
  className="
    mb-6
    font-mono
    text-[11px]
    uppercase
    tracking-[0.4em]
    text-white/40
  "
>
  Select Size
</p>
          <div
            className="
              mt-16
              flex
              flex-wrap
              gap-4
            "
          >
            {product.sizes.map((size) => (
              <button
                key={size}
                className="
                  border
                  border-white/10
                  px-10
                  py-4
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.45em]
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-white/40
                  hover:text-white
                "
              >
                {size}
              </button>
            ))}
          </div>

          <button
  className="
    mt-20
    inline-flex
    items-center
    gap-4
    border-b
    border-white/20
    pb-3
    font-mono
    text-[11px]
    uppercase
    tracking-[0.45em]
    text-white/80
    transition-all
    duration-300
    hover:gap-6
    hover:border-white/60
    hover:text-white
  "
>
  Acquire Piece
  <span aria-hidden>→</span>
</button>
        </div>
      </Container>
    </Section>
  );
}