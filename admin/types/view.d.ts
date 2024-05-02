export interface IView {
  view: "dashboard" | "yachts";
}

export interface IViewActions {
  openView: (view: IView["view"]) => void;
}
