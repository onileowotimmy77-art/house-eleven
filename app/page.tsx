import Loader from "@/components/loader/Loader";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/manifesto/Manifesto";
import Chapter01 from "@/src/features/chapter01/Chapter01";
import EditorialTransition from "@/components/ui/EditorialTranstion";
import Journal from "@/components/journal/Journal";
import Residents from "@/components/residents/Residents";
import Finale from "@/components/finale/Finale";




export default function Home() {
  return (
    <main className=" text-white">
      <Loader />
      <Navbar />

      <Hero />

      <Manifesto />

      <Chapter01 />

      <EditorialTransition
        eyebrow="Journal"
        title="The Conversation Continues"
        description="Essays, campaigns and conversations shaping the future of House Eleven."
      />

      <Journal />

      <Residents />
      <Finale />
    </main>
  );
}