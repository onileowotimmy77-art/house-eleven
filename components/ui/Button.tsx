import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="group relative overflow-hidden rounded-full border border-white px-8 py-4 text-sm uppercase tracking-[0.35em] transition-all duration-500 hover:bg-white hover:text-black">
      {children}
    </button>
  );
}