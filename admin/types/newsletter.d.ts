import { Mongoose } from "mongoose";

export interface NewsletterI {
    _id: string;
    title: string;
    subject: string;
    htmlContent: string;
}