interface IBrokerino {
  _id?: string;
  kindeID: string;
  avatar: string;
  name: string;
  position: string;
  email: string;
  phone: { prefix: string; number: string }[];
  langs: string[];
}

export default IBrokerino;
