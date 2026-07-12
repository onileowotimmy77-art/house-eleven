"use client";


import JournalCard from "./JournalCard";
import Container from "@/components/layout/Container";
import Section from "../layout/Section";
import Stagger from "../motion/Stagger";


export default function Journal() {
  return (
    <Section
      padding="py-44"
    >
      <Container>

      
        <Stagger className="space-y-40 mt-10">

          <JournalCard
            image="/journal1.jpg"
            category="Essay"
            title="Why We Built House Eleven"
          />

          <JournalCard
            image="/journal2.jpg"
            category="Campaign"
            title="The Future of Quiet Luxury"
          />

          <JournalCard
            image="/journal3.jpg"
            category="Architecture"
            title="Architecture Becomes Fashion"
          />
        </Stagger>

      </Container>
    </Section>
  );
}