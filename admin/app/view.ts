import { create } from "zustand";
import { IView, IViewActions } from "@/types/view";

export const useView = create<IView & IViewActions>()((set) => ({
  view: "dashboard",
  openView: (view) => set({ view }),
}));
