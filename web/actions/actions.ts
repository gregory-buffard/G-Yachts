import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { Metadata } from "next";

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
    | "new-construction"
    | "destination"
    | "article"
    | "event";
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
        keywords: saleData.Yacht.seo.value,
        openGraph: {
          title: saleData.Yacht.name,
          siteName: "G-Yachts",
          url: `https://g-yachts.com/${locale}/charters/${id}`,
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
        keywords: saleData.Yacht.seo.value,
        openGraph: {
          title: saleData.Yacht.name,
          siteName: "G-Yachts",
          url: `https://g-yachts.com/${locale}/charters/${id}`,
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
        keywords: charterData.Charter.seo.value,
        openGraph: {
          title: charterData.Charter.name,
          siteName: "G-Yachts",
          url: `https://g-yachts.com/${locale}/charters/${id}`,
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
        keywords: newConstructionData.NewConstruction.seo.value,
        openGraph: {
          title: newConstructionData.NewConstruction.name,
          siteName: "G-Yachts",
          url: `https://g-yachts.com/${locale}/charters/${id}`,
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

    default:
      return {
        title: "G-Yachts",
        description: "G-Yachts",
        keywords: "G-Yachts",
        openGraph: {
          title: "G-Yachts",
          siteName: "G-Yachts",
          url: `https://g-yachts.com/${locale}/charters/${id}`,
          description: "G-Yachts",
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: "https://g-yachts.com/images/logo.png",
              width: 1200,
              height: 630,
              alt: "G-Yachts",
            },
          ],
        },
      };
  }
};
