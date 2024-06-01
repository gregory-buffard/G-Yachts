import { NewsletterI } from "@/types/newsletter";
import { useWeb } from "@/utils/mongoose";
import { Schema } from "mongoose";

const NewsletterSchema = new Schema<NewsletterI>({
    title: {
        type: String,
        required: true,
    },
    htmlContent: {
        type: String,
        required: true
    }
}, {
    collection: "newsletters",
});

const Newsletter = useWeb.models.Newsletter || useWeb.model("Newsletter", NewsletterSchema);

export { Newsletter, type NewsletterI };
