import { IImage } from "./image";

export interface IPartner {
    id: string;
    name: string;
    quote: string;
    comment: string;
    logo: IImage;
    banner: IImage;
    seo: string[];
}
