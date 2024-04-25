import mongoose, { Schema } from "mongoose";
import { IFeatured } from "../types/yachts";

const FeaturedSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    builder: { type: String, required: true },
    length: { type: Number, required: true },
    yearBuilt: { type: Number, required: true },
    sleeps: { type: Number, required: true },
  },
  {
    collection: "yachts",
  },
);

export const Featured = mongoose.model<IFeatured>("Featured", FeaturedSchema);
