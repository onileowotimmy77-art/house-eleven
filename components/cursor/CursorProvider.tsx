"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import {  }

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
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

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