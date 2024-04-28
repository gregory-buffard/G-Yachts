import { INewsletter } from "@/types/newsletter";
import { Schema } from "mongoose";
import { usePanel } from "@/utils/mongoose";

const NewsletterSchema = new Schema<INewsletter>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    collection: "newsletter",
  },
);

const Newsletter =
  usePanel.models.Newsletter || usePanel.model("Newsletter", NewsletterSchema);

export { Newsletter, type INewsletter };
