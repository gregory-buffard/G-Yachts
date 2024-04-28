import mongoose, { Schema } from "mongoose";
import { IContact } from "../types/customer";

const ContactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: false },
    newsletter: { type: Boolean, required: false },
  },
  {
    collection: "archived customers",
  },
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export { Contact, type IContact };
