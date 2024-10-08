import IBrokerino from "@/types/brokerino";

export interface IYacht {
  id: string;
  LOA: number;
  beam: number;
  broker: IBrokerino;
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
  description: string;
  etiquette?: string;
  photos: {
    featured: {
      alt: string;
      sizes: {
        thumbnail: {
          url: string;
          width: number;
          height: number;
        };
        fhd: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    gallery: {
      image: {
        alt: string;
        sizes: {
          thumbnail: {
            url: string;
            width: number;
            height: number;
          };
          fhd: {
            url: string;
            width: number;
            height: number;
          };
        };
      };
    }[];
  };
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
    | "etiquette"
  > {}
