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
              url
              width
              height
            }
            destinationPhoto {
              url
              width
              height
              alt
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
  const destinationsResult = await client.query({
    query: gql`
      query Destinations {
        Destinations (limit: 0) {
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
                url
              }
              destinationPhoto {
                url
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
  const destinations: IDestination[] =
    destinationsResult.data.Destinations.docs.map(remapDestinationPhotos);
  return destinations;
};

const remapDestinationPhotos = (destination: any) => {
  return {
    ...destination,
    photos: {
      featured: destination.photos.featured.url,
      destinationPhoto: destination.photos.destinationPhoto.url,
    },
  };
};
