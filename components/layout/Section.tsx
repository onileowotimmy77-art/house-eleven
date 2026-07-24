import {
  SectionSpacing,
  type SectionSpacingKey,
} from "@/src/lib/spacing";

interface SectionProps {
  children: React.ReactNode;
  className?: string;

  /**
   * Uses the global spacing system.
   */
  padding?: SectionSpacingKey;

  /**
   * Allows bespoke spacing for unique experiences
   * like Product Pages without polluting the
   * global spacing tokens.
   */
  customPadding?: string;
  id?: string;
}

export default function Section({
  children,
  className = "",
  padding = "lg",
  customPadding,
}: SectionProps) {
  return (
    <section
      className={`
        relative
        bg-black
        text-white
        ${customPadding ?? SectionSpacing[padding]}
        ${className}
      `}
    >
      {children}
    </section>
  );
}