import { create } from "zustand";
import { IView, IViewActions } from "@/types/view";
import { currency } from "@/utils/yachts";
import Cookies from "js-cookie";

export const useView = create<IView & IViewActions>()((set) => ({
  currency: currency(),
  view: null,
  setCurrency: (code) => {
    Cookies.set("currency", code);
    set({ currency: code });
  },
  openView: (view) => set({ view }),
}));
