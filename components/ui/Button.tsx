import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Magnetic from "@/components/motion/Magnetic";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <Magnetic>
      <button
        {...props}
        className={clsx(
          `
          rounded-full
          border
          border-white
          px-8
          py-4
          text-xs
          uppercase
          tracking-[0.35em]
          transition-all
          duration-300
          hover:bg-white
          hover:text-black
          `,
          className
        )}
      >
        {children}
      </button>
    </Magnetic>
  );
}