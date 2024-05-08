"use client";

import { createContext, useContext, useState } from "react";
import {
  currency as useCurrency,
  units as useUnits,
  bookmarks as useBookmarks,
} from "@/utils/yachts";
import Cookies from "js-cookie";

interface IActions {
  changeCurrency: (currency: IContext["currency"]) => void;
  changeUnits: (units: IContext["units"]) => void;
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  openView: (view: IContext["view"]) => void;
}

export interface IContext extends IActions {
  currency: string;
  units: {
    length: string;
    weight: string;
  };
  bookmarks: string[];
  view: "navigation" | "contact" | null;
}

const ViewContext = createContext<IContext | undefined>(undefined);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<IContext["currency"]>(useCurrency()),
    [units, setUnits] = useState<IContext["units"]>(useUnits()),
    [view, openView] = useState<IContext["view"]>(null),
    [bookmarks, setBookmarks] = useState<IContext["bookmarks"]>(useBookmarks()),
    changeCurrency = (code: IContext["currency"]) => {
      Cookies.set("currency", code);
      setCurrency(code);
    },
    changeUnits = (units: IContext["units"]) => {
      Cookies.set("length", units.length);
      Cookies.set("weight", units.weight);
      setUnits(units);
    },
    addBookmark = (id: string) => {
      Cookies.set("bookmarks", JSON.stringify([...bookmarks, id]), {
        expires: 365,
      });
      setBookmarks([...bookmarks, id]);
    },
    removeBookmark = (id: string) => {
      Cookies.set(
        "bookmarks",
        JSON.stringify(bookmarks.filter((bookmark) => bookmark !== id)),
      );
      setBookmarks(bookmarks.filter((bookmark) => bookmark !== id));
    };

  const value = {
    currency,
    units,
    view,
    bookmarks,
    changeCurrency,
    changeUnits,
    openView,
    addBookmark,
    removeBookmark,
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
