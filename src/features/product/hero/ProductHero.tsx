"use client";

import Image from "next/image";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import type { Product } from "@/src/data/products";
import { Body, Display } from "@/components/ui/typography";

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({
  product,
}: ProductHeroProps) {
    const heroRef = useRef<HTMLDivElement>(null);

const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end start"],
});

const scale = useTransform(
  scrollYProgress,
  [0, 1],
  [1, 1.08]
);

const y = useTransform(
  scrollYProgress,
  [0, 1],
  [0, 120]
);
  return (
    <>
      {/* Fullscreen Campaign */}
      <section 
        ref={heroRef}
        className="relative h-screen overflow-hidden">
      <motion.div
        style={{
            scale,
            y,
        }}
        className="absolute inset-0"
      >
        <Image
          src={product.gallery[0].image}
          alt={product.gallery[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#050505]
            via-black/30
            to-transparent
          "
        />

        {/* Scroll Indicator */}
        <div
          className="
            absolute
            bottom-10
            left-1/2
            -translate-x-1/2
            flex
            flex-col
            items-center
            gap-4
          "
        >
          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.45em]
              text-white/45
            "
          >
            Scroll
          </span>

          <div className="h-12 w-px bg-white/25" />
        </div>
      </section>

      {/* Product Identity */}
      <Section
        padding="lg"
        className="pt-56 pb-24">
        <Container>
          <p
            className="
              font-mono
              text-xs
              uppercase
              tracking-[0.45em]
              text-white/40
            "
          >
            {product.chapter}
          </p>

          <div className="mt-8 mb-10">
            <div className="h-px w-20 bg-white/10" />
          </div>

          <Display
            as="h1"
            className="
              mt-6
              text-[clamp(4rem,9vw,8rem)]
              
            "
          >
            {product.name}
          </Display>
        <Body
  className="
    mt-16
    max-w-xl
    text-[clamp(1.5rem,2vw,2rem)]
    text-white/90
  "
>
  Designed as the defining garment of {product.chapter}.
</Body>
        </Container>
      </Section>
    </>
  );
}