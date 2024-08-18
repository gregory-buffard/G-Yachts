import { getServerSideSitemap } from "next-sitemap";
import { fetchSitemap } from "@/actions/actions";
import IDoc from "@/types/server-sitemap";

export const GET = async (request: Request) => {
  const data = await fetchSitemap(),
    URLs: {
      loc: string;
      lastmod: string;
      hreflang: string;
      priority: number;
    }[] = [];

  const addURLs = (category: string, basePath: string) => {
    data[category].docs.forEach((doc: IDoc) => {
      URLs.push({
        loc: `https://www.g-yachts.com/fr/${basePath}/${doc.id}`,
        lastmod: doc.updatedAt,
        hreflang: "fr",
        priority: 0.8,
      });
    });
  };

  addURLs("Yachts", "ventes");
  addURLs("Charters", "charters");
  addURLs("NewConstructions", "nouvelles-constructions");
  addURLs("Destinations", "destinations");
  addURLs("Articles", "actualites");
  addURLs("Events", "evenements");

  return getServerSideSitemap(URLs);
};
