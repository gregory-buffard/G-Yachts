import { Schema } from "mongoose";
import { ICard } from "@/types/featured";
import { useWeb } from "@/utils/mongoose";

const FeaturedSchema: Schema<ICard> = new Schema(
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

const Featured =
  useWeb.models.Featured || useWeb.model("Featured", FeaturedSchema);

export { Featured, type ICard };
