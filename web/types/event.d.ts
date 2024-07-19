import { ArticleContentBlock } from "@/types/article";
import { IDestination } from "@/types/destination";

export default interface IEvent {
  id: string;
  title: string;
  fromDate: string;
  toDate: string;
  content: ArticleContentBlock[];
  location: {
    country: string;
    city: string;
    destination: IDestination;
  };
  image: {
    alt: string;
    sizes: {
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
      fhd: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}
