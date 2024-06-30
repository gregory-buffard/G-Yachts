interface IBroker {
  id: string;
  picture?: {
    url: string;
  };
  name: string;
  position: string;
  email: string;
  phones: { prefix: string; number: string }[];
  langs: string[];
}

export default IBroker;
