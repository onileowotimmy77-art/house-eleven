"use client";

import Link from "next/link";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import { collections } from "@/data/collections";

export default function CollectionsIndex() {
  return (
    <Section customPadding="pb-56">
      <Container>
        <div className="border-t border-white/10">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="
                group
                block
                border-b
                border-white/10
                py-24
                transition-colors
                duration-500
              "
            >
              <div
                className="
                  relative
                  flex
                  flex-col
                  gap-12
                  lg:flex-row
                  lg:items-end
                  lg:justify-between
                "
              >
                
                <div>
                  <div className="space-y-4">
                    <p
                      className="
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.45em]
                        text-white/25
                      "
                    >
                      {collection.isCurrent
                        ? "Current Chapter"
                        : "Coming Next"}
                    </p>

                    <p
                      className="
                        font-mono
                        text-[11px]
                        uppercase
                        tracking-[0.35em]
                        text-white/45
                      "
                    >
                      {collection.chapter}
                    </p>
                  </div>

                  <h2
                    className="
                      mt-6
                      text-[clamp(2.5rem,5vw,5rem)]
                      font-black
                      uppercase
                      tracking-[-0.05em]
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                      opacity-80
                    "
                  >
                    {collection.title}
                  </h2>

                  <p
                    className="
                      mt-8
                      max-w-xl
                      leading-8
                      text-white/55
                    "
                  >
                    {collection.subtitle}
                  </p>
                </div>

                <div
  className="
    flex
    items-center
    gap-4

    font-mono
    text-[11px]
    uppercase
    tracking-[0.35em]
    text-white/35
  "
>
  <span>{collection.year}</span>

  <span
    className="
      -translate-x-2
      opacity-0
      transition-all
      duration-500
      group-hover:translate-x-0
      group-hover:opacity-100
    "
  >
    →
  </span>
</div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}