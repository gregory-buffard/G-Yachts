export interface IView {
  currency: string;
  view: "navigation" | "contact" | null;
}

export interface IViewActions {
  setCurrency: (code: string) => void;
  openView: (view: "navigation" | "contact" | null) => void;
}
