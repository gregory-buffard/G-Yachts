"use server"

import IArticle from "@/types/article";
import {Article} from "@/models/article";

export const createArticle = async (article: IArticle) => {
    Article.create(article).catch((e: any) => {
        throw e;
    });
}
export const getArticle = async () => {
    const res = await Article.find().catch((e: any) => {
        throw e;
    });
    return JSON.parse(JSON.stringify(res));
}

export const updateArticle = async (article: any) => {
    const res = await Article.findById(article._id).catch((e: any) => {
        throw e;
    });
    if (!res) throw new Error("Article not found");
    res.en = article.en;
    res.fr = article.fr;
    if (article.image) res.image = article.image;
    res.save().catch((e: any) => {
        throw e;
    });

}