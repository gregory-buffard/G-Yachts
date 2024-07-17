export interface IShipyard {
    id: string;
    name: string;
    quote: string;
    website: string;
    updatedAt: string;
    createdAt: string;
    logo: {
        alt: string;
        url: string;
        sizes: {
            thumbnail: {
                url: string;
            };
            fhd: {
                url: string;
            };
        };
    };
    banner: {
        alt: string;
        url: string;
        sizes: {
            thumbnail: {
                url: string;
            };
            fhd: {
                url: string;
            };
        };
    };
}
