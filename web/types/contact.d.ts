export default interface IContact {
  data: {
    name: string;
    email: string;
    message: string;
    page: string;
    status: "pending";
    tel?: string;
    newsletter: boolean;
  };
  received: Date;
}
