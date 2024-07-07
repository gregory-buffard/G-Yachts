"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { IYacht, ISale } from "@/types/yacht";
import { ICharter, IFeatured } from "@/types/charter";
import { IDestination } from "@/types/destination";
import { remapYachtPhotos } from "@/utils/yachts";
import axios from "axios";

export const fetchFeaturedSales = async () => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Yachts {
        Yachts(where: { featured: { equals: true } }) {
          docs {
            id
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
            featured
            keyFeatures
            broker {
              id
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
              langs
            }
            photos {
              featured {
                url
              }
              gallery {
                image {
                  url
                }
              }
            }
          }
        }
      }
    `,
  });
  const yachts: IYacht[] = data.Yachts.docs.map((yacht: any) =>
    remapYachtPhotos(yacht),
  );
  return yachts;
};

export const fetchSales = async () => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Yachts {
        Yachts {
          docs {
            id
            name
            price
            builder
            category
            length
            sleeps
            yearBuilt
            featured
            photos {
              featured {
                url
              }
              gallery {
                image {
                  url
                }
              }
            }
          }
        }
      }
    `,
  });
  return data.Yachts.docs as ISale[];
};

export const fetchSale = async (id: string) => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Yacht($id: String!) {
        Yacht(id: $id) {
          id
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
          }
          photos {
            featured {
              url
            }
            gallery {
              image {
                url
              }
            }
          }
        }
      }
    `,
    variables: { id },
  });
  return data.Yacht;
};

export const fetchFeaturedCharters = async () => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Charters {
        Charters(where: { featured: { equals: true } }) {
          docs {
            id
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
            featured
            keyFeatures
            broker {
              id
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
              langs
            }
            photos {
              featured {
                url
              }
              gallery {
                image {
                  url
                }
              }
            }
          }
        }
      }
    `,
  });
  const charters: ICharter[] = data.Charters.docs.map(remapYachtPhotos);
  return charters;
};

export const fetchCharters = async () => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Charters {
        Charters {
          docs {
            id
            name
            price
            builder
            length
            sleeps
            yearBuilt
            yearModel
            featured
            photos {
              featured {
                url
              }
              gallery {
                image {
                  url
                }
              }
            }
          }
        }
      }
    `,
  });
  return data.Charters.docs as ICharter[];
};

export const fetchCharter = async (id: string) => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Charter($id: String!) {
        Charter(id: $id) {
          id
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
          featured
          keyFeatures
          broker {
            id
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
            langs
          }
          photos {
            featured {
              url
            }
            gallery {
              image {
                url
              }
            }
          }
        }
      }
    `,
    variables: { id: id },
  });
  return data.Charter;
};

export const fetchChartersForDestination = async (
  destination: IDestination,
): Promise<IFeatured[]> => {
  const client = getClient();
  const charters: IFeatured[] = [];
  // Country
  const { data: countryData } = await client.query({
    query: gql`
      query Charters($country: String!, $limit: Int!) {
        Charters(where: { country: { equals: $country }, limit: $limit }) {
          docs {
            id
            name
            price
            builder
            photos {
              featured {
                url
              }
              gallery {
                image {
                  url
                }
              }
            }
            length
            yearBuilt
            sleeps
            keyFeatures
            broker {
              id
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
              langs
            }
          }
        }
      }
    `,
    variables: { country: destination.country, limit: 4 },
  });
  if (countryData) {
    const countryCharters: IFeatured[] =
      countryData.Charters.docs.map(remapYachtPhotos);
    charters.push(...countryCharters);
  }
  if (charters.length >= 4) return charters;
  // Continent
  const { data: continentData } = await client.query({
    query: gql`
      query Charters($continent: String!, $limit: Int!) {
        Charters(where: { continent: { equals: $continent }, limit: $limit }) {
          docs {
            id
            name
            price
            builder
            photos {
              featured {
                url
              }
              gallery {
                image {
                  url
                }
              }
            }
            length
            yearBuilt
            sleeps
            keyFeatures
            broker {
              id
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
              langs
            }
          }
        }
      }
    `,
    variables: { continent: destination.continent, limit: 4 - charters.length },
  });
  if (continentData) {
    const continentCharters: IFeatured[] =
      continentData.Charters.docs.map(remapYachtPhotos);
    charters.push(...continentCharters);
  }
  if (charters.length >= 4) return charters;
  // Random
  const { data: randomData } = await client.query({
    query: gql`
      query Charters($limit: Int!) {
        Charters(limit: $limit) {
          docs {
            id
            name
            price
            builder
            photos {
              featured {
                url
              }
              gallery {
                image {
                  url
                }
              }
            }
            length
            yearBuilt
            sleeps
            keyFeatures
            broker {
              id
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
              langs
            }
          }
        }
      }
    `,
    variables: { limit: 4 - charters.length },
  });
  if (!randomData) return charters;
  const randomCharters: IFeatured[] =
    randomData.Charters.docs.map(remapYachtPhotos);
  charters.push(...randomCharters);
  return charters;
};

export const getRate = async (currency: string) => {
  "use server";
  if (currency === "EUR") return 1;
  try {
    const res = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=${currency}&base_currency=EUR`,
    );
    return 1 * res.data.data[currency];
  } catch (e) {
    console.error("Error fetching currency");
    return 1;
  }
};
