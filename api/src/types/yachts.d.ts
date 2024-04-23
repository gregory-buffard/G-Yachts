import { Document } from "mongoose";

export interface IFeatured extends Document {
  name: string;
  price: number;
  builder: string;
  length: number;
  yearBuilt: number;
  sleeps: number;
}
