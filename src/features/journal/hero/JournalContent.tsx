"use client";

import { Display, Body } from "@/components/ui/typography";

export default function JournalContent() {
  return (
    <div className="max-w-5xl">
      <Display className="max-w-4xl">
        Journal
      </Display>

      <Body className="mt-10 max-w-2xl text-white/60 leading-relaxed">
        Essays from the House.
        <br />
        Stories behind the collections.
        <br />
        Craft, architecture,
        <br />
        and the pursuit of permanence.
      </Body>
    </div>
  );
}