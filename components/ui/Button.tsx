interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="rounded-full border border-white/30 px-10 py-5 uppercase tracking-[0.4em]  text-xs transition-all duration-500 hover:bg-white hover:text-black">
      {children}
    </button>
  );
}