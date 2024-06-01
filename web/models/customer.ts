import { ICustomer } from "@/types/customer";
import { Schema } from "mongoose";
import { usePanel } from "@/utils/mongoose";

const CustomerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: false },
    message: { type: String, required: false },
    inquiry: {
      buying: { type: Boolean, required: false },
      selling: { type: Boolean, required: false },
      chartering: { type: Boolean, required: false },
      other: { type: Boolean, required: false },
    },
    newsletter: { type: Boolean, required: false },
    status: { type: String, required: true },
  },
  {
    collection: "customers",
  },
);

const Customer =
  usePanel.models.Customer || usePanel.model("Customer", CustomerSchema);

export { Customer, type ICustomer };
