"use server";

import { Article } from "@/models/article";

export const fetchArticle = async (id: string) => {
    return await Article.findById(id).catch((e) => {
        throw e;
    });
};

export const fetchArticles = async () => {
    return await Article.find()
        .sort({
            date: -1,
        })
        .catch((e) => {
            throw e;
        });
};