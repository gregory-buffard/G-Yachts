import { ArticleContentBlock } from "./article";

export interface IDestination {
  id: string;
  destination: string;
  country: string;
  region: string;
  continent: string;
  photos: {
    featured: {
      url: string;
      width: number;
      height: number;
      alt: string;
    };
    destinationPhoto: {
      url: string;
      width: number;
      height: number;
      alt: string;
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
