import mongoose, { Schema } from "mongoose";
import { ICustomer } from "../types/customer";

const CustomerSchema: Schema = new Schema(
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
  },
  {
    collection: "customers",
  },
);

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

export { Customer, type ICustomer };
