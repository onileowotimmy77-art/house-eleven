"use client";

import JournalHeader from "./JournalHeader";
import JournalCard from "./JournalCard";
import Container from "../Container";
import Section from "../layout/Section";
import Stagger from "../motion/Stagger";

export default function Journal() {
  return (
    <Section>
      <Container>

        <JournalHeader />

        <Stagger className="space-y-40">

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