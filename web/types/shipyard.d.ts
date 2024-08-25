export interface IShipyard {
  id: string;
  name: string;
  quote: string;
  website: string;
  updatedAt: string;
  createdAt: string;
  logo: {
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
  banner: {
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
}
