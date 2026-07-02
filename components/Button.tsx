type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[#F5F2EA] text-black hover:bg-white"
      : "border border-[#F5F2EA] text-[#F5F2EA] hover:bg-[#F5F2EA] hover:text-black";

  return (
    <button
      className={`${styles} px-8 py-4 uppercase tracking-[0.3em] transition-all duration-300`}
    >
      {children}
    </button>
  );
}