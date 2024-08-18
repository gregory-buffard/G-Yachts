"use server";

import { getClient } from "@/apollo";
import { IDestination } from "@/types/destination";
import { gql } from "@apollo/client";

export const fetchDestination = async (id: string): Promise<IDestination> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Destination($id: String!) {
        Destination(id: $id) {
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
    },
  });
  return data.Destination;
};

export const fetchDestinations = async (): Promise<IDestination[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Destinations {
        Destinations {
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
  });

  return data.Destinations.docs;
};
