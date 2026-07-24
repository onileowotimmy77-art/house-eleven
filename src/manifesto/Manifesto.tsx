"use client";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import ManifestoHeader from "./ManifestoHeader";
import ManifestoIntro from "./ManifestoIntro";
import ManifestoStatements from "./ManifestoStatements";



export default function Manifesto() {
  
  return (
    <Section padding="xl">
      <Container>

        <ManifestoHeader />

        <ManifestoIntro />

        <ManifestoStatements />

    

      </Container>
    </Section>
  );
}