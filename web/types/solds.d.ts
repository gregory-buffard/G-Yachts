interface ISolds {
    name: string;
    price: number;
    yearBuilt: number;
    length: number;
    model: string;
    builder: string;
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
}

export default ISolds;