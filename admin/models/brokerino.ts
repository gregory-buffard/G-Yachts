import { Schema } from "mongoose";
import IBrokerino from "@/types/brokerino";
import { useWeb } from "@/utils/mongoose";

const BrokerinoSchema = new Schema<IBrokerino>(
  {
    kindeID: { type: String, required: true },
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phone: [
      {
        prefix: { type: String, required: true },
        number: { type: String, required: true },
      },
    ],
    langs: { type: [String], required: true },
  },
  {
    collection: "brokerinos",
  },
);

const Brokerino =
  useWeb.models.Brokerino || useWeb.model("Brokerino", BrokerinoSchema);

export { Brokerino, type IBrokerino };
