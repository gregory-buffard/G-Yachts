export interface IImage {
    url: string;
    alt?: string;

    sizes: {
        thumbnail: {
            url?: string;
        };
        fhd: {
            url?: string;
        };
    };
}
