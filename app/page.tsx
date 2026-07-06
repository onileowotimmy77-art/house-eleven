import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/manifesto/Manifesto";
import Collections from "@/components/collections/Collections";
import Residents from "@/components/residents/Residents";
import Journal from "@/components/journal/Journal";
import Finale from "@/components/finale/Finale";
import Loader from "@/components/loader/Loader";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Loader />
      <Navbar />
      <Hero />
      <Manifesto />
      <Collections />
      <Residents />
      <Journal />
      <Finale />
    </main>
  );
}