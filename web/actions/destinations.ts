"use server";

import { getClient } from "@/apollo";
import { IDestination } from "@/types/destination";
import { gql } from "@apollo/client";

export const fetchDestination = async (
  slug: string,
  locale: "en" | "fr",
): Promise<IDestination> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Destination($slug: String, $locale: LocaleInputType!) {
        Destinations(
          where: { slug: { equals: $slug } }
          locale: $locale
          limit: 1
        ) {
          docs {
            destination
            country
            region
            continent
            description
            coordinates
            updatedAt
            createdAt
            photos {
              featured {
                alt
                sizes {
                  fhd {
                    url
                    width
                    height
                  }
                }
              }
              destinationPhoto {
                alt
                sizes {
                  fhd {
                    url
                    width
                    height
                  }
                }
              }
            }
            info {
              bestTimeToVisit
              languages
              gettingThere
              currency
            }
          }
        }
      }
    `,
    variables: {
      slug,
      locale,
    },
  });

  return data.Destinations.docs[0];
};

export const fetchDestinations = async (
  locale: "en" | "fr",
): Promise<IDestination[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Destinations($locale: LocaleInputType!) {
        Destinations(locale: $locale, limit: 0) {
          docs {
            slug
            destination
            country
            region
            continent
            description
            coordinates
            updatedAt
            createdAt
            indexField
            photos {
              featured {
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
            info {
              bestTimeToVisit
              languages
              gettingThere
              currency
            }
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });

  return [...data.Destinations.docs].sort(
    (a: IDestination, b: IDestination) => a.indexField - b.indexField,
  );
};
