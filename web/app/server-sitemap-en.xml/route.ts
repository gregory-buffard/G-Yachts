import { getServerSideSitemap } from "next-sitemap";
import { fetchSitemap } from "@/actions/actions";
import IDoc from "@/types/server-sitemap";

export const GET = async (request: Request) => {
  const data = await fetchSitemap(),
    URLs: {
      loc: string;
      lastmod: string;
      hrefLang: string;
      priority: number;
    }[] = [];

  const addURLs = (category: string, basePath: string) => {
    data[category].docs.forEach((doc: IDoc) => {
      URLs.push({
        loc: `https://www.g-yachts.com/en/${basePath}/${doc.id}`,
        lastmod: doc.updatedAt,
        hrefLang: "en",
        priority: 0.8,
      });
    });
  };

  addURLs("Yachts", "sales");
  addURLs("Charters", "charters");
  addURLs("NewConstructions", "new-constructions");
  addURLs("Destinations", "destinations");
  addURLs("Articles", "news");
  addURLs("Events", "events");

  return getServerSideSitemap(URLs);
};
