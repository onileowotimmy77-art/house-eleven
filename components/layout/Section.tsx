interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

export default function Section({
  children,
  className = "",
  padding = "py-40",
}: SectionProps) {
  return (
    <section
      className={`
        max-w-[1600]
        relative
        overflow-hidden
        bg-black
        
        text-white
        ${padding}
        ${className}
      `}
    >
      {children}
    </section>
  );
}