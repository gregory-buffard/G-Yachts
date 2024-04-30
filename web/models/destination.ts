import { Schema } from "mongoose";
import { IDestination } from "@/types/destination";
import { useWeb } from "@/utils/mongoose";

const DestinationSchema = new Schema<IDestination>(
  {
    country: { type: String, required: true },
    region: { type: String, required: true },
  },
  {
    collection: "destinations",
  },
);

const Destination =
  useWeb.models.Destination || useWeb.model("Destination", DestinationSchema);

export { Destination, type IDestination };
