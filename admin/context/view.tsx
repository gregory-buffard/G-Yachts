"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type NavActive = "dashboard" | "yachts" | "new" | "charters" | "destinations" | "newsletter" | "article" | "messages";

interface IContext {
  active: NavActive;
  setActive: (active: NavActive) => void;
}

// biome-ignore lint/style/noNonNullAssertion: This is a valid use case for non-null assertion
const ViewContext = createContext<IContext>(undefined!);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<NavActive>("dashboard");

  const value = { active, setActive };

  return (
    <ViewContext.Provider value={value}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useViewContext must be used within a ViewProvider");
  }
  return context;
};
