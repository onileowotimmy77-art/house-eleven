"use client";

import ResidentsHeader from "./ResidentsHeader";
import ResidentCard from "./ResidentCard";
import Container from "../Container";
import Section from "../layout/Section";
import Stagger from "@/components/motion/Stagger";

export default function Residents() {
return (
<Section
  padding="py-48"
>
    <Container>
        <ResidentsHeader />

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
