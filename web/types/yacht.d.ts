import IBrokerino from "@/types/brokerino";

export default interface IYacht {
  id: string;
  LOA: number;
  beam: number;
  broker?: IBrokerino;
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
  minDraft?: number;
  model: string;
  name: string;
  region: string;
  rooms: number;
  sleeps: number;
  subcategory: string;
  tonnage: number;
  yearBuilt: number;
  yearModel: number;
  featured: boolean;
  promotion: boolean;
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

export interface ISale extends IYacht {
  price: number;
  yearRefit?: number;
}

export interface ICharter extends IYacht {
  price: {
    low: number;
    high: number;
  };
  reservations: {
    from: Date;
    to: Date;
  }[];
  yearRefit?: number;
}

export interface INewConstruction extends IYacht {
  delivery: string;
  price: number;
}
