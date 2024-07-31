interface ILang {
  name: string;
  flag: string;
}

interface IBrokerino {
  _id?: string;
  picture?: {
    alt: string;
    sizes: {
      fhd: {
        url: string;
        width: number;
        height: number;
      };
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  name: string;
  position: string;
  email: string;
  phones: { prefix: string; number: string }[];
  socials: {
    platform: string;
    link: string;
  }[];
  langs: ILang[];
}

export default IBrokerino;
