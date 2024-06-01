export interface ICustomer {
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
    status: string;
}
