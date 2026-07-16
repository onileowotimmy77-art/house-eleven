"use client";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";


import ChapterCampaign from "./ChapterCampaign";
import ResidenceShowcase from "@/src/features/chapter01/ResidenceShowcase/ResidenceShowcase";
import SectionHeader from "@/components/ui/SectionHeader";
import Transition from "../transition/Transition";



export default function Chapter01() {
  return (
    <Section padding="py-20">
      <Container className="max-w-none">

        <SectionHeader className="mt-5"
          eyebrow="Chapter I"
          title="Residence"
        />

        <ChapterCampaign />

        <Transition />

        <ResidenceShowcase />

      </Container>
    </Section>
  );
}