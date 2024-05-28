"use client";

import { createContext, useContext, useState } from "react";
import { IDestination } from "@/types/destination";

interface IContext {
  destination: IDestination;
}

const DestinationContext = createContext<IContext | undefined>(undefined);

export const DestinationProvider = ({
  destination,
  children,
}: {
  destination: IDestination;
  children: React.ReactNode;
}) => {
  const props = {
    destination,
  };

  return <DestinationContext.Provider value={props}>{children}</DestinationContext.Provider>;
};

export const useDestination = (): IContext => {
  const context = useContext(DestinationContext);
  if (context === undefined) {
    throw new Error("useDestination must be used within an DestinationProvider");
  }
  return context;
};
