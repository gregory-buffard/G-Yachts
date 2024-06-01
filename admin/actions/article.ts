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