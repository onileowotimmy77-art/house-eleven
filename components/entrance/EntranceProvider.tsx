"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { getLenis } from "@/lib/lenis";

export type EntranceState =
  | "idle"
  | "preparing"
  | "welcome"
  | "transitioning"
  | "entered";

interface EntranceContextType {
  entranceState: EntranceState;

  setEntranceState: (
    state: EntranceState
  ) => void;

  enterHouse: () => void;
}

const EntranceContext =
  createContext<EntranceContextType | null>(null);

export function EntranceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    entranceState,
    setEntranceState,
  ] = useState<EntranceState>("idle");

  function enterHouse() {
  if (entranceState !== "idle") return;

  setEntranceState("preparing");

  window.setTimeout(() => {
    setEntranceState("welcome");
  }, 350);

  window.setTimeout(() => {
  setEntranceState("transitioning");

  const lenis = getLenis();

  if (!lenis) return;

  lenis.scrollTo("#manifesto", {
    offset: 0,
    duration: 2.4,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });
}, 1100);

  window.setTimeout(() => {
    setEntranceState("entered");
  }, 2400);
}
  return (
    <EntranceContext.Provider
      value={{
        entranceState,
        setEntranceState,
        enterHouse,
      }}
    >
      {children}
    </EntranceContext.Provider>
  );
}

export function useEntrance() {
  const context = useContext(
    EntranceContext
  );

  if (!context) {
    throw new Error(
      "useEntrance must be used inside EntranceProvider"
    );
  }

  return context;
}