import { Mongoose } from "mongoose";

export interface NewsletterI {
    _id: string;
    title: string;
    htmlContent: string;
}