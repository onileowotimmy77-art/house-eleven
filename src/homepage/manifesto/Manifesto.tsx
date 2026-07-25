"use client";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import ManifestoHeader from "./ManifestoHeader";
import 



export default function Manifesto() {
  
  return (
    <Section 
      id="manifesto"
      padding="lg">
      <Container>

        <ManifestoHeader />
        <HomepageManifesto cinematic />

    

      </Container>
    </Section>
  );
}