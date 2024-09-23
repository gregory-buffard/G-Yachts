interface IBrokers {
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
    langs: string[];
}

export default IBrokers;
