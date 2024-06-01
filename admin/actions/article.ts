"use server"

import IArticle from "@/types/article";
import {Article} from "@/models/article";

export const createArticle = async (article: IArticle) => {
    Article.create(article).catch((e: any) => {
        throw e;
    });
}