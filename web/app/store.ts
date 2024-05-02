import { create } from "zustand";
import { IView, IViewActions } from "@/types/view";
import { currency, units } from "@/utils/yachts";
import Cookies from "js-cookie";

export const useView = create<IView & IViewActions>()((set) => ({
  currency: currency(),
  units: units(),
  view: null,
  setCurrency: (code) => {
    Cookies.set("currency", code);
    set({ currency: code });
  },
  setUnits: (units) => {
    Cookies.set("length", units.length);
    Cookies.set("weight", units.weight);
    set({ units });
  },
  openView: (view) => set({ view }),
}));
