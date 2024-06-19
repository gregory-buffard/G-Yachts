export interface IDestination {
  id: string;
  destination: string;
  country: string;
  region: string;
  continent: string;
  photos: {
    featured: string;
    destinationPhoto: string;
  };
  description: string;
  info: {
    bestTimeToVisit: string;
    languages: string;
    gettingThere: string;
    currency: string;
  };
  coordinates?: [number, number];
}
