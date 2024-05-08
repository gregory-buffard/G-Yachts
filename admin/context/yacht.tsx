"use client";

import { createContext, ReactNode, useContext } from "react";
import { IYacht as Yacht } from "@/types/yacht";

const YachtContext = createContext<IYacht | undefined>(undefined);

interface IYacht extends Yacht {
  _id: string;
}

export const YachtProvider = ({
  children,
  yacht,
}: {
  children: ReactNode;
  yacht: IYacht;
}) => {
  return (
    <YachtContext.Provider value={yacht}>{children}</YachtContext.Provider>
  );
};

export const useYacht = (): IYacht => {
  const context = useContext(YachtContext);
  if (context === undefined) {
    throw new Error("useYacht must be used within an YachtProvider");
  }
  return context;
};
