"use client";

import clsx from "clsx";

interface RadioFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export default function RadioField({
  label,
  description,
  className,
  ...props
}: RadioFieldProps) {
  return (
    <label
      className={clsx(
        `
        flex
        cursor-pointer
        items-start
        gap-5
        `,
        className
      )}
    >
      <input
        {...props}
        type="radio"
        className="
          mt-1
          h-5
          w-5

          appearance-none
          rounded-full

          border
          border-white/20

          bg-transparent

          transition-colors
          duration-300

          checked:border-white
          checked:bg-white

          hover:border-white/40

          focus:outline-none
          focus:border-white
        "
      />

      <div>

        <p
          className="
            text-base
            text-white
          "
        >
          {label}
        </p>

        {description && (
          <p
            className="
              mt-2
              text-sm
              leading-6
              text-white/50
            "
          >
            {description}
          </p>
        )}

      </div>

    </label>
  );
}