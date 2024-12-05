"use server";

import { IArticle } from "@/types/article";
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
            alt
            sizes {
              thumbnail {
                url
                width
                height
              }
              fhd {
                url
                width
                height
              }
            }
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
): Promise<IArticle[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Articles($locale: LocaleInputType!) {
        Articles(locale: $locale, fallbackLocale: en, sort: "date", limit: 0) {
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
              alt
              sizes {
                thumbnail {
                  url
                  width
                  height
                }
                fhd {
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });
  return [...data.Articles.docs].reverse();
};
