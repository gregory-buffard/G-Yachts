"use client";

import { createContext, useContext, useState } from "react";
import { ICharter } from "@/types/charter";

interface IActions {
  changeView: (view: "info" | "features" | "gallery") => void;
}

interface IContext extends IActions {
  view: "info" | "features" | "gallery";
  charter: ICharter;
}

const CharterContext = createContext<IContext | undefined>(undefined);

export const CharterProvider = ({
  charter,
  children,
}: {
  charter: ICharter;
  children: React.ReactNode;
}) => {
  const [view, changeView] = useState<IContext["view"]>("info");

  const props = {
    view,
    changeView,
    charter,
  };

  return (
    <CharterContext.Provider value={props}>{children}</CharterContext.Provider>
  );
};

export const useCharter = (): IContext => {
  const context = useContext(CharterContext);
  if (context === undefined) {
    throw new Error("useCharter must be used within an CharterProvider");
  }
  return context;
};
