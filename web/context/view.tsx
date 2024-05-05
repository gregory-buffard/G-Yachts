"use client";

import { createContext, useContext, useState } from "react";
import { currency as useCurrency, units as useUnits } from "@/utils/yachts";
import Cookies from "js-cookie";

interface IActions {
  changeCurrency: (currency: IContext["currency"]) => void;
  changeUnits: (units: IContext["units"]) => void;
  openView: (view: IContext["view"]) => void;
}

export interface IContext extends IActions {
  currency: string;
  units: {
    length: string;
    weight: string;
  };
  view: "navigation" | "contact" | null;
}

const ViewContext = createContext<IContext | undefined>(undefined);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<IContext["currency"]>(useCurrency()),
    [units, setUnits] = useState<IContext["units"]>(useUnits()),
    [view, openView] = useState<IContext["view"]>(null),
    changeCurrency = (code: IContext["currency"]) => {
      Cookies.set("currency", code);
      setCurrency(code);
    },
    changeUnits = (units: IContext["units"]) => {
      Cookies.set("length", units.length);
      Cookies.set("weight", units.weight);
      setUnits(units);
    };

  const value = {
    currency,
    units,
    view,
    changeCurrency,
    changeUnits,
    openView,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

export const useViewContext = (): IContext => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useViewContext must be used within an ViewProvider");
  }
  return context;
};
