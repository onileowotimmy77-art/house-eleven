import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return (
    <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-[-0.04em] md:text-7xl xl:text-8xl">
      {children}
    </h2>
  );
}