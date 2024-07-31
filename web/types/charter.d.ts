import { IYacht } from "./sale";

export interface ICharter extends IYacht {
  price: {
    low: number;
    high: number;
  };
  reservations: {
    from: Date;
    to: Date;
  }[];
}

export interface IFeatured
  extends Pick<
    IYacht,
    | "id"
    | "price"
    | "name"
    | "builder"
    | "length"
    | "yearBuilt"
    | "sleeps"
    | "photos"
  > {}

export interface ICFeatured
  extends Pick<
    IYacht,
    | "id"
    | "price"
    | "name"
    | "builder"
    | "length"
    | "yearBuilt"
    | "sleeps"
    | "photos"
  > {
  price: {
    low: number;
    high: number;
  };
}
