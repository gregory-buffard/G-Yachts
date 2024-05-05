"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IActions {
  openView: (view: IContext["view"]) => void;
}

export interface IContext extends IActions {
  view: (typeof views)[number];
}

export const views = ["dashboard", "yachts"];

const ViewContext = createContext<IContext | undefined>(undefined);

export const ViewProvider = ({
  children,
  dashboard,
  yachts,
}: {
  children: ReactNode;
  dashboard: ReactNode;
  yachts: ReactNode;
}) => {
  const [view, openView] = useState<IContext["view"]>("dashboard");

  const value = {
    view,
    openView,
  };

  useEffect(() => {
    console.log(view);
  }, [view]);

  return (
    <ViewContext.Provider value={value}>
      {view === "dashboard" ? (
        dashboard
      ) : view === "yachts" ? (
        yachts
      ) : (
        <h1>Oops! Something went wrong.</h1>
      )}
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = (): IContext => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useViewContext must be used within an ViewProvider");
  }
  return context;
};
