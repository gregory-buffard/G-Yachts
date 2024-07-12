"use server";

import { IYacht } from "@/types/sale";
import { ICharter } from "@/types/charter";
import { IDestination } from "@/types/destination";
import { IArticle } from "@/types/article";
import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const searchAll = async (
    query: string,
    locale: string
): Promise<{
    yachts: IYacht[];
    charters: ICharter[];
    destinations: IDestination[];
    articles: IArticle[];
    pages: { title: string; url: string }[];
}> => {
    const client = getClient();
    const limit = 3;

    // Search
    const { data: yachts } = await client.query({
        query: gql`
            query Yachts($query: String!, $limit: Int) {
                Yachts(where: { name: { contains: $query } }, limit: $limit) {
                    docs {
                        id
                        name
                    }
                }
            }
        `,
        variables: {
            query,
            limit,
            locale,
        },
    });
    const { data: charters } = await client.query({
        query: gql`
            query Charters($query: String!, $limit: Int) {
                Charters(where: { name: { contains: $query } }, limit: $limit) {
                    docs {
                        id
                        name
                    }
                }
            }
        `,
        variables: {
            query,
            limit,
            locale,
        },
    });
    const { data: destinations } = await client.query({
        query: gql`
            query Destinations($query: String!, $limit: Int) {
                Destinations(where: { destination: { contains: $query } }, limit: $limit) {
                    docs {
                        id
                        destination
                    }
                }
            }
        `,
        variables: {
            query,
            limit,
            locale,
        },
    });
    const { data: articles } = await client.query({
        query: gql`
            query Articles($query: String!, $limit: Int, $locale: LocaleInputType!) {
                Articles(where: { title: { contains: $query } }, locale: $locale, limit: $limit) {
                    docs {
                        id
                        title
                    }
                }
            }
        `,
        variables: {
            query,
            limit,
            locale,
        },
    });

    // Search pages
    var pages = [
        { titleEn: "Sales", titleFr: "Ventes", url: "/sales" },
        { titleEn: "Charters", titleFr: "Charters", url: "/charters" },
        { titleEn: "Company", titleFr: "Compagnie", url: "/company" },
        { titleEn: "Destinations", titleFr: "Destinations", url: "/destinations" },
        { titleEn: "Partners", titleFr: "Partenaires", url: "/partners" },
        { titleEn: "News", titleFr: "Actualites", url: "/news" },
        { titleEn: "Recruitment", titleFr: "Recrutement", url: "/recruitment" },
    ];

    // Filter pages by locale and query
    pages = pages.filter((page) =>
        page[locale === "fr" ? "titleFr" : "titleEn"].toLowerCase().includes(query.toLowerCase())
    );
    const finalPages = pages.map((page) => {
        return {
            title: locale === "fr" ? page.titleFr : page.titleEn,
            url: page.url,
        };
    });
    return {
        yachts: yachts.Yachts.docs,
        charters: charters.Charters.docs,
        destinations: destinations.Destinations.docs,
        articles: articles.Articles.docs,
        pages: finalPages,
    };
};
