"use server";

import { getClient } from "@/apollo";
import { IDestination } from "@/types/destination";
import { gql } from "@apollo/client";

export const fetchDestination = async (
  id: string,
  locale: "en" | "fr",
): Promise<IDestination> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Destination($id: String!, $locale: LocaleInputType!) {
        Destination(id: $id, locale: $locale) {
          id
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
    `,
    variables: {
      id,
      locale,
    },
  });
  return data.Destination;
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
            id
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
