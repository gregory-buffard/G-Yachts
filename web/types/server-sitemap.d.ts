import IYacht from "@/types/yacht";
import { IDestination } from "@/types/destination";
import { IArticle } from "@/types/article";
import IEvent from "@/types/event";

export default interface IDoc extends IYacht, IDestination, IArticle, IEvent {
  updatedAt: string;
}
