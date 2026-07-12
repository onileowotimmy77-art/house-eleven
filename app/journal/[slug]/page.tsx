import { notFound } from "next/navigation";

import Navbar from "@/components/navigation/Navbar";
import Finale from "@/components/finale/Finale";

import JournalArticle from "@/src/features/journal/article/JournalArticle";
import { journalContent } from "@/src/data/journal-content";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return journalContent.map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function JournalPage({
  params,
}: Props) {
  const { slug } = await params;

  const article = journalContent.find(
    (entry) => entry.slug === slug
  );

  if (!article) {
    notFound();
  }

  return (
    <main className="text-white">
      <Navbar />

      <JournalArticle article={article} />

      <Finale />
    </main>
  );
}