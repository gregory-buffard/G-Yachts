interface IBrokerino {
  _id?: string;
  picture?: {
    url: string;
  };
  name: string;
  position: string;
  email: string;
  phones: { prefix: string; number: string }[];
  socials: {
    platform: string;
    link: string;
  }[];
  langs: string[];
}

export default IBrokerino;
