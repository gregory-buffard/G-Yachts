import { ArticleContentBlock } from "@/types/article";

export default interface IEvent {
  id: string;
  title: string;
  fromDate: string;
  toDate: string;
  content: ArticleContentBlock[];
  image: {
    url: string;
  };
}
