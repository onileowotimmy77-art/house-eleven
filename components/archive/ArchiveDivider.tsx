interface ArchiveDividerProps {
  className?: string;
}

export default function ArchiveDivider({
  className = "",
}: ArchiveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`
        mx-auto
        my-10
        h-px
        w-36
        bg-white/15
        ${className}
      `}
    />
  );
}