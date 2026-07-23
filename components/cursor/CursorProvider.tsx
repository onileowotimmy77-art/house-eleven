"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { usePathname } from "next/navigation";

type CursorContextType = {
  label: string;
  hovering: boolean;
  setLabel: (label: string) => void;
  setHovering: (hovering: boolean) => void;
};

const CursorContext = createContext<CursorContextType | null>(null);

export function CursorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

  // Reset cursor state after every route change
  useEffect(() => {
    setHovering(false);
    setLabel("");
  }, [pathname]);

  return (
    <CursorContext.Provider
      value={{
        label,
        hovering,
        setLabel,
        setHovering,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error(
      "useCursorContext must be used inside CursorProvider"
    );
  }

  return context;
}