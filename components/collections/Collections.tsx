"use client";

import CollectionHeader from "./CollectionHeader";
import CollectionCard from "./CollectionCard";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section"
import Stagger from "@/components/motion/Stagger";

export default function Collections() {
   
return (
<Section>
<Container>
<CollectionHeader />

<Stagger>
<CollectionCard
image="/collection1.jpg"
code="H11-001"
title="Foundation Knit Polo"
/>

<CollectionCard
image="/collection2.jpg"
code="H11-002"
title="Heavyweight Tee"
/>

<CollectionCard
image="/collection3.jpg"
code="H11-003"
title="Tailored Trouser"
/>
</Stagger>
</Container>
</Section>
);
}
