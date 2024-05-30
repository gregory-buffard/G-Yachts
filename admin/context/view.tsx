"use client";

import React, {createContext, ReactNode, useContext, useState, useEffect, useMemo} from "react";


interface IContext {
  active: "dashboard" | "yachts" | "new" | "charters" | "destinations";
  setActive: (active: "dashboard" | "yachts" | "new" | "charters" | "destinations") => void;
}


const ViewContext = createContext<IContext>(undefined!);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<"dashboard" | "yachts" | "new" | "charters" | "destinations">("dashboard");



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
