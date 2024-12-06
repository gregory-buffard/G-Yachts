import { ArticleContentBlock } from "@/types/article";

export interface IDestination {
  id: string;
  slug: string;
  destination: string;
  country: string;
  region: string;
  continent: string;
  indexField: number;
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
    destinationPhoto: {
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
  };
  description: ArticleContentBlock[];
  info: {
    bestTimeToVisit: string;
    languages: string;
    gettingThere: string;
    currency: string;
  };
  coordinates?: [number, number];
}
