import Navbar from "@/components/navigation/Navbar";
import Finale from "@/components/finale/Finale";

import JournalHero from "@/src/features/journal/hero/JournalHero";
import JournalList from "@/src/features/journal/JournalList";
import FeaturedEditorial from "@/src/features/journal/featured";
import ArchiveIntro from "@/src/features/journal/archive";

export default function JournalPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      <JournalHero />

      <FeaturedEditorial />

      <ArchiveIntro />

      <JournalList />

      <Finale />
    </main>
  );
}