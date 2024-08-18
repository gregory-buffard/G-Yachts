/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_ADMIN_BASE_URI || "https://www.g-yachts.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://www.g-yachts.com/server-sitemap-en.xml",
      "https://www.g-yachts.com/server-sitemap-fr.xml",
    ],
  },
  additionalPaths: async (config) => {
    const result = [],
      staticPaths = [
        {
          locale: "en",
          paths: [
            "",
            "charters",
            "company",
            "destinations",
            "events",
            "management",
            "new-constructions",
            "news",
            "partners",
            "recruitment",
            "sales",
          ],
        },
        {
          locale: "fr",
          paths: [
            "",
            "charters",
            "compagnie",
            "destinations",
            "evenements",
            "management",
            "nouvelles-constructions",
            "actualites",
            "partenaires",
            "recrutement",
            "ventes",
          ],
        },
      ];

    staticPaths.map((paths) => {
      paths.paths.forEach((path) => {
        result.push({
          loc: `/${paths.locale}/${path}`,
          lastmod: new Date().toISOString(),
          priority: 0.7,
          hrefLang: paths.locale,
        });
      });
    });

    return result;
  },
  alternateRefs: [
    {
      href: "https://www.g-yachts.com/",
      hrefLang: "x-default",
    },
    {
      href: "https://www.g-yachts.com/en",
      hrefLang: "en",
    },
    {
      href: "https://www.g-yachts.com/fr",
      hrefLang: "fr",
    },
  ],
  exclude: [
    "/admin",
    "/admin/*",
    "/server-sitemap-en.xml",
    "/server-sitemap-fr.xml",
  ],
};
