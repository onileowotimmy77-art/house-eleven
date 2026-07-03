import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return (
    <section className="py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16 xl:px-24">
        {children}
      </div>
    </section>
  );
}