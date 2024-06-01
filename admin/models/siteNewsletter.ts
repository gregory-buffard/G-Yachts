import { Schema } from "mongoose";
import { usePanel } from "@/utils/mongoose";
import { ISiteNewsletter } from "@/types/siteNewsletter";

const SiteNewsletterSchema = new Schema<ISiteNewsletter>(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        collection: "newsletter",
    },
);

const SiteNewsletter =
    usePanel.models.Newsletter || usePanel.model("Newsletter", SiteNewsletterSchema);

export { SiteNewsletter, type ISiteNewsletter };
