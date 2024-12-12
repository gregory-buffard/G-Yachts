"use server";

import { IYacht } from "@/types/sale";
import { ICharter } from "@/types/yacht";
import { IDestination } from "@/types/destination";
import { IArticle } from "@/types/article";

export const searchAll = async (
  query: string,
  locale: string,
): Promise<{
  yachts: IYacht[];
  charters: ICharter[];
  destinations: IDestination[];
  articles: IArticle[];
  pages: { title: string; url: string }[];
}> => {
  // Search
  const result = await fetch(
    process.env.NEXT_PUBLIC_ADMIN_BASE_URI +
      "/api/search?query=" +
      query +
      "&locale=" +
      locale,
  );
  const data = await result.json();
  const { yachts, charters, destinations, articles } = {
    yachts: data.yachts,
    charters: data.charters,
    destinations: data.destinations,
    articles: data.articles,
  };

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
    yachts,
    charters,
    destinations,
    articles,
    pages: finalPages,
  };
};
