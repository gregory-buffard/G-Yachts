"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { INewConstruction } from "@/types/newConstruction";
import { IShipyard } from "@/types/shipyard";
import { randomBytes } from "crypto";
import { IFeatured } from "@/types/sale";

export const fetchFeaturedConstructions = async (): Promise<
  INewConstruction[]
> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query NewConstructions {
        NewConstructions(where: { featured: { equals: true } }, limit: 0) {
          docs {
            id
            delivery
            name
            price
            builder
            length
            sleeps
            yearBuilt
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
      }
    `,
  });
  return data.NewConstructions.docs;
};

export const fetchNewConstructions = async (): Promise<INewConstruction[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query NewConstructions {
        NewConstructions(limit: 0) {
          docs {
            id
            delivery
            name
            price
            builder
            category
            length
            sleeps
            yearBuilt
            featured
            etiquette
            photos {
              featured {
                alt
                sizes {
                  thumbnail {
                    url
                    width
                    height
                  }
                }
              }
              gallery {
                image {
                  alt
                  sizes {
                    thumbnail {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  return data.NewConstructions.docs;
};

export const fetchNewConstruction = async (
  id: string,
): Promise<INewConstruction> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query NewConstruction($id: String!) {
        NewConstruction(id: $id) {
          id
          delivery
          name
          model
          price
          LOA
          beam
          builder
          category
          city
          continent
          country
          cruising
          crypto
          length
          state
          material
          maxDraft
          minDraft
          region
          rooms
          sleeps
          subcategory
          tonnage
          yearBuilt
          yearModel
          keyFeatures
          description
          broker {
            name
            email
            picture {
              url
            }
            position
            phones {
              prefix
              number
            }
            socials {
              platform
              link
            }
          }
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
            gallery {
              image {
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
          }
        }
      }
    `,
    variables: { id },
  });
  return data.NewConstruction;
};

export const fetchShipyards = async (): Promise<IShipyard[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Shipyards {
        Shipyards {
          docs {
            id
            name
            quote
            website
            updatedAt
            createdAt
            logo {
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
            banner {
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
        }
      }
    `,
  });
  console.log(data.Shipyards.docs);
  return data.Shipyards.docs;
};

export const fetchSimilarNewConstructions = async (
  length: number,
): Promise<IFeatured[]> => {
  const client = getClient();
  const { data: highestClicks } = await client.query({
    query: gql`
      query NewConstructions {
        NewConstructions(sort: "clicks", limit: 4) {
          docs {
            id
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
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
      }
    `,
    variables: { length },
  });
  const { data: biggerLength } = await client.query({
    query: gql`
      query NewConstructions($length: Float!) {
        NewConstructions(
          sort: "length"
          limit: 2
          where: { length: { greater_than: $length } }
        ) {
          docs {
            id
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
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
      }
    `,
    variables: { length },
  });
  const { data: smallerLength } = await client.query({
    query: gql`
      query NewConstructions($length: Float!) {
        NewConstructions(
          sort: "length"
          limit: 2
          where: { length: { less_than: $length } }
        ) {
          docs {
            id
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
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
      }
    `,
    variables: { length },
  });
  return [
    ...highestClicks.NewConstructions.docs,
    ...biggerLength.NewConstructions.docs,
    ...smallerLength.NewConstructions.docs,
  ];
};
