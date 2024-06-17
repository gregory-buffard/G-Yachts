interface IBroker {
    id: string;
    picture?: string;
    name: string;
    position: string;
    email: string;
    phones: { prefix: string; number: string }[];
    langs: string[];
}

export default IBroker;
