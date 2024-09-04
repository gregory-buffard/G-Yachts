"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { Metadata } from "next";
import { joinSEO } from "@/utils/metadata";
import puppeteer from "puppeteer";
import Cookies from "js-cookie";

export const fetchMetadata = async ({
  id,
  type,
  locale,
}: {
  id: string;
  type:
    | "sale"
    | "sales"
    | "charter"
    | "charters"
    | "new-construction"
    | "new-constructions"
    | "destination"
    | "destinations"
    | "article"
    | "articles"
    | "event"
    | "events";
  locale: "en" | "fr";
}): Promise<Metadata> => {
  const client = getClient();

  switch (type) {
    case "sale":
      const { data: saleData } = await client.query({
        query: gql`
          query Yacht($locale: LocaleInputType!, $id: String!) {
            Yacht(locale: $locale, id: $id) {
              name
              description
              seo {
                value
              }
              photos {
                featured {
                  sizes {
                    fhd {
                      url
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { id, locale },
      });
      return {
        title: saleData.Yacht.name,
        description: saleData.Yacht.description,
        keywords: joinSEO(saleData.Yacht.seo.value),
        openGraph: {
          title: saleData.Yacht.name,
          siteName: "G-Yachts",
          url:
            locale === "en"
              ? `https://www.g-yachts.com/${locale}/sales/${id}`
              : `https://www.g-yachts.com/${locale}/ventes/${id}`,
          description: saleData.Yacht.description,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(saleData.Yacht.photos.featured.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: saleData.Yacht.photos.featured.alt,
            },
          ],
        },
      };

    case "sales":
      const { data: salesData } = await client.query({
        query: gql`
          query Yacht($locale: LocaleInputType!, $id: String!) {
            Yacht(locale: $locale, id: $id) {
              name
              description
              seo {
                value
              }
              photos {
                featured {
                  sizes {
                    fhd {
                      url
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { id, locale },
      });
      return {
        title: saleData.Yacht.name,
        description: saleData.Yacht.description,
        keywords: saleData.Yacht.seo.value,
        openGraph: {
          title: saleData.Yacht.name,
          siteName: "G-Yachts",
          url: `https://www.g-yachts.com/${locale}/charters/${id}`,
          description: saleData.Yacht.description,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(saleData.Yacht.photos.featured.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: saleData.Yacht.photos.featured.alt,
            },
          ],
        },
      };

    case "charter":
      const { data: charterData } = await client.query({
        query: gql`
          query Charter($locale: LocaleInputType!, $id: String!) {
            Charter(locale: $locale, id: $id) {
              name
              description
              seo {
                value
              }
              photos {
                featured {
                  sizes {
                    fhd {
                      url
                    }
                  }
                  alt
                }
              }
            }
          }
        `,
        variables: { id, locale },
      });
      return {
        title: charterData.Charter.name,
        description: charterData.Charter.description,
        keywords: joinSEO(charterData.Charter.seo.value),
        openGraph: {
          title: charterData.Charter.name,
          siteName: "G-Yachts",
          url: `https://www.g-yachts.com/${locale}/charters/${id}`,
          description: charterData.Charter.description,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(charterData.Charter.photos.featured.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: charterData.Charter.photos.featured.alt,
            },
          ],
        },
      };

    case "new-construction":
      const { data: newConstructionData } = await client.query({
        query: gql`
          query NewConstruction($locale: LocaleInputType!, $id: String!) {
            NewConstruction(locale: $locale, id: $id) {
              name
              description
              seo {
                value
              }
              photos {
                featured {
                  sizes {
                    fhd {
                      url
                    }
                  }
                  alt
                }
              }
            }
          }
        `,
        variables: { id, locale },
      });
      return {
        title: newConstructionData.NewConstruction.name,
        description: newConstructionData.NewConstruction.description,
        keywords: joinSEO(newConstructionData.NewConstruction.seo.value),
        openGraph: {
          title: newConstructionData.NewConstruction.name,
          siteName: "G-Yachts",
          url:
            locale === "en"
              ? `https://www.g-yachts.com/${locale}/new-constructions/${id}`
              : `https://www.g-yachts.com/${locale}/nouvelles-constructions/${id}`,
          description: newConstructionData.NewConstruction.description,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(
                newConstructionData.NewConstruction.photos.featured.sizes.fhd
                  .url,
              ),
              width: 1200,
              height: 630,
              alt: newConstructionData.NewConstruction.photos.featured.alt,
            },
          ],
        },
      };

    case "event":
      const { data: eventData } = await client.query({
        query: gql`
          query Event($locale: LocaleInputType!, $id: String!) {
            Event(locale: $locale, id: $id) {
              title
              fromDate
              toDate
              image {
                alt
                sizes {
                  fhd {
                    url
                  }
                }
              }
              seo {
                value
              }
              location {
                city
                country
              }
            }
          }
        `,
        variables: { id, locale },
      });
      return {
        title: eventData.Event.title,
        description: `${eventData.Event.fromDate} - ${eventData.Event.toDate} | ${eventData.Event.location.city}, ${eventData.Event.location.country}`,
        keywords: joinSEO(eventData.Event.seo.value),
        openGraph: {
          title: eventData.Event.title,
          siteName: "G-Yachts",
          url:
            locale === "en"
              ? `https://www.g-yachts.com/${locale}/events/${id}`
              : `https://www.g-yachts.com/${locale}/evenements/${id}`,
          description: `${eventData.Event.fromDate} - ${eventData.Event.toDate} | ${eventData.Event.location.city}, ${eventData.Event.location.country}`,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(eventData.Event.image.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: eventData.Event.image.alt,
            },
          ],
        },
      };

    case "destination":
      const { data: destinationData } = await client.query({
        query: gql`
          query Destination($locale: LocaleInputType!, $id: String!) {
            Destination(locale: $locale, id: $id) {
              destination
              country
              region
              continent
              seo {
                value
              }
              photos {
                featured {
                  alt
                  sizes {
                    fhd {
                      url
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { id, locale },
      });
      return {
        title: destinationData.Destination.destination,
        description: `${destinationData.Destination.destination}, ${destinationData.Destination.country}, ${destinationData.Destination.region}, ${destinationData.Destination.continent}`,
        keywords: joinSEO(destinationData.Destination.seo.value),
        openGraph: {
          title: destinationData.Destination.destination,
          siteName: "G-Yachts",
          url: `https://www.g-yachts.com/${locale}/destinations/${id}`,
          description: `${destinationData.Destination.destination}, ${destinationData.Destination.country}, ${destinationData.Destination.region}, ${destinationData.Destination.continent}`,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(
                destinationData.Destination.photos.featured.sizes.fhd.url,
              ),
              width: 1200,
              height: 630,
              alt: destinationData.Destination.photos.featured.alt,
            },
          ],
        },
      };

    case "article":
      const { data: articleData } = await client.query({
        query: gql`
          query Article($locale: LocaleInputType!, $id: String!) {
            Article(locale: $locale, id: $id) {
              title
              category(locale: $locale) {
                title
              }
              author {
                name
              }
              image {
                alt
                sizes {
                  fhd {
                    url
                  }
                }
              }
              seo {
                value
              }
            }
          }
        `,
        variables: { id, locale },
      });
      return {
        title: articleData.Article.title,
        description: articleData.Article.category.title,
        keywords: joinSEO(articleData.Article.seo.value),
        authors: articleData.Article.author.name,
        openGraph: {
          title: articleData.Article.title,
          siteName: "G-Yachts",
          url:
            locale === "en"
              ? `https://www.g-yachts.com/${locale}/news/${id}`
              : `https://www.g-yachts.com/${locale}/actualites/${id}`,
          description: articleData.Article.category.title,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(articleData.Article.image.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: articleData.Article.image.alt,
            },
          ],
        },
      };

    default:
      return {
        title: "G-Yachts",
        description: "G-Yachts",
        keywords: "G-Yachts",
        openGraph: {
          title: "G-Yachts",
          siteName: "G-Yachts",
          url: `https://www.g-yachts.com/${locale}/charters/${id}`,
          description: "G-Yachts",
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: "https://www.g-yachts.com/images/openGraph.png",
              width: 1200,
              height: 630,
              alt: "G-Yachts logo",
            },
          ],
        },
      };
  }
};

export const fetchSitemap = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: gql`
      query Sitemap {
        Articles(limit: 0) {
          docs {
            id
            updatedAt
          }
        }
        Yachts(limit: 0) {
          docs {
            id
            updatedAt
          }
        }
        Charters(limit: 0) {
          docs {
            id
            updatedAt
          }
        }
        NewConstructions(limit: 0) {
          docs {
            id
            updatedAt
          }
        }
        Destinations(limit: 0) {
          docs {
            id
            updatedAt
          }
        }
        Events(limit: 0) {
          docs {
            id
            updatedAt
          }
        }
      }
    `,
  });
  return data;
};

export const getRate = async (currency: string) => {
  if (currency === "EUR") return 1;

  try {
    const url = `https://finance.yahoo.com/quote/EUR${currency}=X/`,
      browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        executablePath: "/usr/bin/google-chrome",
        args: ["--no-sandbox"],
      }),
      page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const consentSel = 'button[name="agree"]';
    await page
      .locator(consentSel)
      .click()
      .then(
        async () => await page.waitForNavigation({ waitUntil: "networkidle2" }),
      );

    const rate = await page.evaluate(() => {
      const element = document.querySelector(
        'fin-streamer[data-testid="qsp-price"]',
      );

      return element && element.textContent && parseFloat(element.textContent);
    });

    await browser.close();
    return rate;
  } catch (e) {
    console.error("Error fetching currency: ", e);
    return 1;
  }
};
