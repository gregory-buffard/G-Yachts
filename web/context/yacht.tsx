"use client";

import { createContext, useContext, useState } from "react";
import { ISale, ICharter, INewConstruction } from "@/types/yacht";

interface IActions {
  changeView: (view: "info" | "features" | "gallery") => void;
  view: "info" | "features" | "gallery";
}

interface ISaleContext extends IActions {
  data: ISale;
  type: "sale";
}

interface ICharterContext extends IActions {
  data: ICharter;
  type: "charter";
}

interface INewConstructionContext extends IActions {
  data: INewConstruction;
  type: "new-construction";
}

type IContext = ISaleContext | ICharterContext | INewConstructionContext;

const YachtContext = createContext<IContext | undefined>(undefined);

export const YachtProvider = ({
  data,
  type,
  children,
}: {
  data: IContext["data"];
  type: IContext["type"];
  children: React.ReactNode;
}) => {
  const [view, changeView] = useState<IContext["view"]>("info");

  const props = {
    view,
    changeView,
    data,
    type,
  } as IContext;

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
