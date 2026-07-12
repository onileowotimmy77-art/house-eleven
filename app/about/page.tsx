"use client";

import PageIntro from "@/components/editorial/PageIntro";

import AboutManifesto from "@/src/features/about/AboutManifesto"
import AboutPrinciples from "@/src/features/about/AboutPrinciples";

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="House Eleven"
        title="A Philosophy of Restraint"
        description="House Eleven exists to create garments that outlive trends through proportion, craftsmanship, and quiet confidence."
        align="center"
      />

      <AboutManifesto />

      <AboutPrinciples />
    </>
  );
}