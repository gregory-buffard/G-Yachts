import { Schema } from "mongoose";
import { IDestination } from "@/types/destination";
import { useWeb } from "@/utils/mongoose";

const DestinationSchema = new Schema<IDestination>(
  {
    destination: { type: String, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    continent: { type: String, required: true },
    photos: {
      featured: { type: String, required: true, default: "" },
      destinationPhoto: { type: String, required: true, default: "" },
    },
    description: { type: String, required: true },
    info: {
      bestTimeToVisit: { type: String, required: true },
      languages: { type: String, required: true },
      gettingThere: { type: String, required: true },
      currency: { type: String, required: true },
    },
    coordinates: { type: [Number], required: false },
  },
  {
    collection: "destinations",
  }
);

const Destination = useWeb.models.Destination || useWeb.model("Destination", DestinationSchema);

export { Destination, type IDestination };
