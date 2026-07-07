import { notFound } from "next/navigation";

import { collections } from "@/data/collections";

import CollectionHero from "@/components/collections/CollectionHero";
import CollectionStory from "@/components/collections/CollectionStory";
import CollectionQuote from "@/components/collections/CollectionQuote";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CollectionPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const collection = collections.find(
    (item) => item.slug === slug
  );

  if (!collection) {
    notFound();
  }

  return (
    <>
      <CollectionHero collection={collection} />
      <CollectionStory collection={collection} />
      <CollectionQuote collection={collection} />
    </>
  );
}