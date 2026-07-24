import { notFound } from "next/navigation";

import { collections } from "@/data/collections";

import CollectionHero from "@/src/collections/CollectionHero";
import CollectionStory from "@/src/collections/CollectionStory";
import CollectionQuote from "@/src/collections/CollectionQuote";
import CollectionCampaign from "@/src/collections/CollectionsCampaign";
import CollectionPieces from "@/src/collections/CollectionPieces";

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
      <CollectionCampaign collection={collection}/>
      <CollectionStory collection={collection} />
      <CollectionPieces collection={collection} />
      <CollectionQuote collection={collection} />
    </>
  );
}