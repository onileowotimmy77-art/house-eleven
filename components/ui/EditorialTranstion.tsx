"use client";

import { Display, Eyebrow, Body } from "@/components/ui/typography";

interface EditorialTransitionProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function EditorialTransition({
  eyebrow,
  title,
  description,
}: EditorialTransitionProps) {
  return (
    <section className="py-40">
      <div className="mx-auto max-w-5xl text-center">

        <Eyebrow>{eyebrow}</Eyebrow>

        <Display className="mt-8">
          {title}
        </Display>
        <div className="my-10 flex justify-center">
            <div className="h-px w-28 bg-white/10" />
        </div>
        <Body
          className="
            mx-auto
            mt-10
            max-w-2xl
            text-center
            text-white/60
          "
        >
          {description}
        </Body>

      </div>
    </section>
  );
}