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
    url: string;
    width: number;
    height: number;
    alt: string;
  };
}
