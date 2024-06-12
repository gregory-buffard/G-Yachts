import { Schema } from "mongoose";
import { useWeb } from "@/utils/mongoose";
import IArticle from "@/types/article";

const ArticleSchema = new Schema<IArticle>(
    {
        heroImage: { type: String, required: true },
        en:{
            headline: { type: String, required: true },
            category: { type: String, required: true },
            article: { type: String, required: true },
        },
        fr:{
            headline: { type: String, required: true },
            category: { type: String, required: true },
            article: { type: String, required: true },
        },
        date: { type: String, required: true },
    },
    {
        collection: "articles",
    },
);

const Article =
    useWeb.models.Article || useWeb.model("Article", ArticleSchema);

export { Article, type IArticle };
