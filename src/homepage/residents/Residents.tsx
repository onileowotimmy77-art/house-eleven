"use client";

import SectionHeader from "../../../components/ui/SectionHeader";
import ResidentCard from "./ResidentCard";
import Container from "@/components/layout/Container";
import Section from "../../../components/layout/Section";
import Stagger from "@/components/motion/Stagger";

export default function Residents() {
return (
<Section
  customPadding="py-48"
>
    <Container>
       <SectionHeader  
          eyebrow="Residents"
          title="The House"
          description="Designers, photographers, musicians and artists building the culture of House Eleven."
        />
        <Stagger 
        className="
        grid 
        gap-10 
        md:grid-cols-2 
        lg:grid-cols-3
        "
        >
            <ResidentCard
            image="/resident1.jpg"
            name="Kai"
            role="Photographer"
            />

            <ResidentCard
            image="/resident2.jpg"
            name="Amara"
            role="Stylist"
            />

            <ResidentCard
            image="/resident3.jpg"
            name="Noah"
            role="Creative Director"
            />
        </Stagger>
    </Container>
</Section>
);
}
