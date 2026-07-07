import Link from "next/link";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import { collections } from "@/data/collections";

export default function CollectionsPage() {
  return (
    <Section padding="py-40">
      <Container>
        <h1 className="text-6xl font-black uppercase">
          Collections
        </h1>

        <div className="mt-20 space-y-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="block border-b border-white/10 pb-8"
            >
              <p className="text-sm uppercase text-white/40">
                {collection.season}
              </p>

              <h2 className="mt-2 text-4xl font-black uppercase">
                {collection.title}
              </h2>

              <p className="mt-3 max-w-xl text-white/60">
                {collection.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}