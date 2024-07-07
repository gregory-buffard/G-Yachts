import IBroker from "./broker";

export interface IYacht {
  id: string;
  LOA: number;
  beam: number;
  broker: IBroker;
  builder: string;
  category: string;
  city: string;
  continent: string;
  country: string;
  cruising: boolean;
  crypto: boolean;
  length: number;
  state: string;
  material: string;
  maxDraft: number;
  minDraft: number;
  model: string;
  name: string;
  price: number;
  region: string;
  rooms: number;
  sleeps: number;
  subcategory: string;
  tonnage: number;
  yearBuilt: number;
  yearModel: number;
  featured: boolean;
  keyFeatures: string[];
  photos: {
    featured: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    gallery: {
      image: {
        url: string;
        alt: string;
        width: number;
        height: number;
      };
    }[];
  };
}

export interface ISale
  extends Pick<
    IYacht,
    | "id"
    | "name"
    | "price"
    | "builder"
    | "category"
    | "length"
    | "sleeps"
    | "yearBuilt"
    | "featured"
    | "photos"
  > {}

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
