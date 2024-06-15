"use server";

import { IArticle } from "@/models/article";
import { gql } from "@apollo/client";
import { getClient } from "@/apollo";

export const fetchArticle = async (id: string, locale: string) => {
    const client = getClient();
    const { data } = await client.query({
        query: gql`
            query Article($id: String!, $locale: LocaleInputType!) {
                Article(id: $id, locale: $locale) {
                    id
                    title
                    date
                    content(depth: 10)
                    category(locale: $locale, fallbackLocale: en) {
                        title
                        id
                    }
                    image {
                        url
                    }
                }
            }
        `,
        variables: {
            id,
            locale,
        },
    });
    return data.Article;
};

export const fetchArticles = async (
    locale: "en" | "fr",
    options?: { limit?: number }
): Promise<IArticle[]> => {
    const client = getClient();
    const { data } = await client.query({
        query: gql`
            query Articles($locale: LocaleInputType!, $limit: Int) {
                Articles(locale: $locale, fallbackLocale: en, sort: "date", limit: $limit) {
                    docs {
                        id
                        title
                        date
                        content(depth: 10)
                        category(locale: $locale, fallbackLocale: en) {
                            title
                            id
                        }
                        image {
                            url
                        }
                    }
                }
            }
        `,
        variables: {
            locale,
            limit: options?.limit,
        },
    });
    return data.Articles.docs;
};