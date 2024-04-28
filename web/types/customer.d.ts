import { IContact } from "@/types/contact";

export interface ICustomer extends IContact {
  name: string;
  email: string;
  tel?: string;
  message?: string;
  inquiry?: {
    buying: boolean;
    selling: boolean;
    chartering: boolean;
    other: boolean;
  };
  newsletter?: boolean;
}
