"use client";

import Container from "@/components/layout/Container";

export default function TransitionLine() {
  return (
    <Container>
      <div
        className="
          mx-auto
          h-px
          w-20
          bg-white/10
        "
      />
    </Container>
  );
}