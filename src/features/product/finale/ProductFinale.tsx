"use client";

import Link from "next/link";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

export default function ProductFinale() {
  return (
    <Section
      padding="py-64"
      className="border-t border-white/10"
    >
      <Container>
        <div className="text-center">

          <p
            className="
              font-mono
              text-[11px]
              mt-20
              uppercase
              tracking-[0.45em]
              text-white/40
            "
          >
            House Eleven
          </p>

          <h2
            className="
              mx-auto
              mt-10
              max-w-6xl
              
              text-[clamp(4rem,8vw,7rem)]
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.06em]
            "
          >
            Every Piece
            <br />
            Begins With
            <br />
            Intention.
          </h2>

          <Link
            href="/collections"
            className="
              mt-16
            
              inline-flex
              font-mono
              text-xs
              uppercase
              tracking-[0.4em]
              text-white/70
              transition-all
              duration-300
              hover:text-white
            "
          >
            Explore Chapter 01 →
          </Link>

        </div>
      </Container>
    </Section>
  );
}