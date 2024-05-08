import { Schema } from "mongoose";
import { IYacht } from "@/types/yacht";
import { useWeb } from "@/utils/mongoose";

const YachtSchema = new Schema<IYacht>(
  {
    LOA: { type: Number, required: true },
    beam: { type: Number, required: true },
    brokerEmail: { type: String, required: true },
    builder: { type: String, required: true },
    category: { type: String, required: true },
    city: { type: String, required: true },
    continent: { type: String, required: true },
    country: { type: String, required: true },
    cruising: { type: Boolean, required: true },
    crypto: { type: Boolean, required: true },
    length: { type: Number, required: true },
    state: { type: String, required: true },
    material: { type: String, required: true },
    maxDraft: { type: Number, required: true },
    minDraft: { type: Number, required: true },
    model: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    region: { type: String, required: true },
    rooms: { type: Number, required: true },
    sleeps: { type: Number, required: true },
    subcategory: { type: String, required: true },
    tonnage: { type: Number, required: true },
    yearBuilt: { type: Number, required: true },
    yearModel: { type: Number, required: true },
    featured: { type: Boolean, required: true },
    photos: {
      featured: { type: String, required: true, default: "" },
      gallery: { type: [String], required: true, default: [] },
    },
  },
  {
    collection: "yachts",
  },
);

const Yacht = useWeb.models.Yacht || useWeb.model("Yacht", YachtSchema);

export { Yacht, type IYacht };
