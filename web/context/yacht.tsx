"use client";

import { createContext, useContext, useState } from "react";
import { IYacht } from "@/types/sale";

interface IActions {
  changeView: (view: "info" | "features" | "gallery") => void;
}

interface IContext extends IActions {
  view: "info" | "features" | "gallery";
  yacht: IYacht;
}

const YachtContext = createContext<IContext | undefined>(undefined);

export const YachtProvider = ({
  yacht,
  children,
}: {
  yacht: IYacht;
  children: React.ReactNode;
}) => {
  const [view, changeView] = useState<IContext["view"]>("info");

  const props = {
    view,
    changeView,
    yacht,
  };

  return (
    <YachtContext.Provider value={props}>{children}</YachtContext.Provider>
  );
};

export const useYacht = (): IContext => {
  const context = useContext(YachtContext);
  if (context === undefined) {
    throw new Error("useYacht must be used within an YachtProvider");
  }
  return context;
};
