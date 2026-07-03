import { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
}

export default function Label({ children }: LabelProps) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/50">
      {children}
    </p>
  );
}