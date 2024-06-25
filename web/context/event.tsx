"use client";

import { createContext, useContext } from "react";
import IEvent from "@/types/event";

const EventContext = createContext<IEvent | undefined>(undefined);

export const EventProvider = ({
  event,
  children,
}: {
  event: IEvent;
  children: React.ReactNode;
}) => <EventContext.Provider value={event}>{children}</EventContext.Provider>;

export const useEvent = (): IEvent => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
