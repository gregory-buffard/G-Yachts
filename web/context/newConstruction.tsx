"use client";

import { createContext, useContext, useState } from "react";
import { INewConstruction } from "@/types/newConstruction";

interface IActions {
  changeView: (view: "info" | "features" | "gallery") => void;
}

interface IContext extends IActions {
  view: "info" | "features" | "gallery";
  yacht: INewConstruction;
}

const NewConstructionContext = createContext<IContext | undefined>(undefined);

export const NewConstructionProvider = ({
  yacht,
  children,
}: {
  yacht: INewConstruction;
  children: React.ReactNode;
}) => {
  const [view, changeView] = useState<IContext["view"]>("info");

  const props = {
    view,
    changeView,
    yacht,
  };

  return (
    <NewConstructionContext.Provider value={props}>{children}</NewConstructionContext.Provider>
  );
};

export const useNewConstruction = (): IContext => {
  const context = useContext(NewConstructionContext);
  if (context === undefined) {
    throw new Error("useNewConstruction must be used within an YachtProvider");
  }
  return context;
};
