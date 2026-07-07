import Loader from "@/components/loader/Loader";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/manifesto/Manifesto";
import Collections from "@/components/collections/Collections";
import Journal from "@/components/journal/Journal";
import Residents from "@/components/residents/Residents";
import Finale from "@/components/finale/Finale";


export default function Home() {
  return (
    <main className="bg-black text-white">
      <Loader />
      <Navbar />

      <Hero />

      <Manifesto />

      <Collections />

      <Journal />
      
      <Residents />
      <Finale />
    </main>
  );
}