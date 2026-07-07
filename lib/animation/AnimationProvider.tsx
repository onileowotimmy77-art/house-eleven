"use client";

import { createContext, useContext } from "react";

interface AnimationContextType {
  enabled: boolean;
}

const AnimationContext =
  createContext<AnimationContextType>({
    enabled: true,
  });

export function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimationContext.Provider
      value={{
        enabled: true,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  return useContext(AnimationContext);
}