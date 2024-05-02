export interface IView {
  currency: string;
  units: {
    length: string;
    weight: string;
  };
  view: "navigation" | "contact" | null;
}

export interface IViewActions {
  setCurrency: (currency: IView["currency"]) => void;
  setUnits: (units: IView["units"]) => void;
  openView: (view: IView["view"]) => void;
}
