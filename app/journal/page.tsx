import Navbar from "@/components/navigation/Navbar";
import Finale from "@/components/finale/Finale";

import JournalIntro from "@/components/editorial/JournalIntro";
import JournalList from "@/src/features/journal/JournalList";

export default function JournalPage() {
  return (
    <main className="text-white">
      <Navbar />

      <JournalIntro />

      <JournalList />

      <Finale />
    </main>
  );
}