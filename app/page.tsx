import Loader from "@/components/loader/Loader";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/src/hero/Hero";
import Manifesto from "@/src/manifesto/Manifesto";
import Chapter01 from "@/src/features/chapter01/Chapter01";
import EditorialTransition from "@/components/ui/EditorialTranstion";
import Journal from "@/src/journal/Journal";
import Residents from "@/src/residents/Residents";
import Finale from "@/components/finale/Finale";






export default function Home() {
  return (
    <main>
      <Loader />
      <Navbar />

      <Hero />

      <Manifesto />

      <Chapter01 />

      <EditorialTransition
  eyebrow="FROM GARMENTS TO IDEAS"
  title="Every House Begins With a Philosophy"
  description="House Eleven exists beyond the garments themselves. Every collection begins with an idea, a question, and a belief that clothing should outlive seasons. The Journal is where those ideas are documented."
/>

      <Journal />

      <Residents />
      <Finale />
    </main>
  );
}