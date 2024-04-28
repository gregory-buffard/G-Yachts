export interface IContact {
  name: string;
  email: string;
  tel?: string;
  newsletter?: boolean;
}

export interface ICustomer extends IContact {
  message?: string;
  inquiry?: {
    buying: boolean;
    selling: boolean;
    chartering: boolean;
    other: boolean;
  };
}
