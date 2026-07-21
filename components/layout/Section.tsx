import {
  SectionSpacing,
  type SectionSpacingKey,
} from "@/src/lib/spacing";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: SectionSpacingKey;
}

export default function Section({
  children,
  className = "",
  padding = "lg",
}: SectionProps) {
  return (
    <section
      className={`
        relative
        bg-black
        text-white
        ${SectionSpacing[padding]}
        ${className}
      `}
    >
      {children}
    </section>
  );
}