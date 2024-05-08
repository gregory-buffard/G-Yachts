export interface IYacht {
  LOA: number;
  beam: number;
  brokerEmail: string;
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
  photos: {
    featured: string;
    gallery: string[];
  };
}

export interface IFeatured
  extends Pick<
    IYacht,
    "price" | "name" | "builder" | "length" | "yearBuilt" | "sleeps" | "photos"
  > {
  _id: string;
}
