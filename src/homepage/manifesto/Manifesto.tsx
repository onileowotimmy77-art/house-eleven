"use client";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import ManifestoHeader from "./ManifestoHeader";
import ManifestoIntro from "./ManifestoIntro";
import ManifestoStatements from "../../features/manifesto/ManifestoStatements";



export default function Manifesto() {
  
  return (
    <Section 
      id="manifesto"
      padding="xl">
      <Container>

        <ManifestoHeader />

        <ManifestoIntro />

        <ManifestoStatements />

    

      </Container>
    </Section>
  );
}