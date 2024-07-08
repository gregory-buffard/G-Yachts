"use server";

import { IYacht as SYacht } from "@/types/sale";
import { IYacht as CYacht } from "@/types/charter";
import { IDestination } from "@/types/destination";
import { IArticle } from "@/types/article";
import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const searchAll = async (
  query: string,
  locale: string,
): Promise<{
  yachts: SYacht[];
  charters: CYacht[];
  destinations: IDestination[];
  articles: IArticle[];
  pages: { title: string; url: string }[];
}> => {
  const client = getClient();
  const limit = 3;

  // Search yachts
  const { data } = await client.query({
    query: gql`
      query Yachts($query: String!, $limit: Int, $locale: LocaleInputType!) {
        Yachts(where: { name: { contains: $query } }, limit: $limit) {
          docs {
            id
            name
          }
        }
      }
      query Charters($query: String!, $limit: Int, $locale: LocaleInputType!) {
        Charters(where: { name: { contains: $query } }, limit: $limit) {
          docs {
            id
            name
          }
        }
      }
      query Destinations(
        $query: String!
        $limit: Int
        $locale: LocaleInputType!
      ) {
        Destinations(
          where: { destination: { contains: $query } }
          limit: $limit
        ) {
          docs {
            id
            destination
          }
        }
      }
      query Articles($query: String!, $limit: Int, $locale: LocaleInputType!) {
        Articles(
          where: { title: { contains: $query } }
          locale: $locale
          limit: $limit
        ) {
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
  console.log(data);

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
    page[locale === "fr" ? "titleFr" : "titleEn"]
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const finalPages = pages.map((page) => {
    return {
      title: locale === "fr" ? page.titleFr : page.titleEn,
      url: page.url,
    };
  });
  return {
    yachts: data.Yachts.docs,
    charters: data.Charters.docs,
    destinations: data.Destinations.docs,
    articles: data.Articles.docs,
    pages: finalPages,
  };
};
