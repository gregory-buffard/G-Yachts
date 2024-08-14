"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { IFeatured as SFeatured, ISale, IYacht as SYacht } from "@/types/sale";
import { ICFeatured, ICharter } from "@/types/charter";
import { IDestination } from "@/types/destination";
import axios from "axios";

export const fetchFeaturedSales = async (
  locale: "en" | "fr",
): Promise<SFeatured[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Yachts($locale: LocaleInputType!) {
        Yachts(
          locale: $locale
          where: { featured: { equals: true } }
          limit: 0
        ) {
          docs {
            id
            name
            price
            builder
            length
            sleeps
            yearBuilt
            etiquette
            photos {
              featured {
                sizes {
                  fhd {
                    url
                  }
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });
  return data.Yachts.docs;
};

export const fetchSales = async (locale: "en" | "fr"): Promise<ISale[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Yachts($locale: LocaleInputType!) {
        Yachts(locale: $locale, limit: 0) {
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
    variables: {
      locale,
    },
  });
  return data.Yachts.docs;
};

export const fetchSale = async (
  id: string,
  locale: "en" | "fr",
): Promise<SYacht> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Yacht($locale: LocaleInputType!, $id: String!) {
        Yacht(locale: $locale, id: $id) {
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
          description
          broker {
            name
            email
            picture {
              alt
              sizes {
                thumbnail {
                  url
                  width
                  height
                }
              }
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
    variables: { id, locale },
  });
  return data.Yacht;
};

export const fetchFeaturedCharters = async (): Promise<ICFeatured[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Charters {
        Charters(where: { featured: { equals: true } }, limit: 0) {
          docs {
            id
            name
            price {
              low
              high
            }
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
  return data.Charters.docs;
};

export const fetchCharters = async (): Promise<ICharter[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Charters {
        Charters(limit: 0) {
          docs {
            id
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            etiquette
            reservations {
              from
              to
            }
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
              gallery {
                image {
                  sizes {
                    thumbnail {
                      url
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
  return data.Charters.docs;
};

export const fetchCharter = async (id: string): Promise<ICharter> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Charter($id: String!) {
        Charter(id: $id) {
          id
          name
          model
          price {
            low
            high
          }
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
          description
          reservations {
            from
            to
          }
          broker {
            id
            name
            email
            picture {
              alt
              sizes {
                thumbnail {
                  url
                  width
                  height
                }
              }
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
            langs
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
    variables: { id: id },
  });
  return data.Charter;
};

export const fetchChartersForDestination = async (
  destination: IDestination,
): Promise<ICharter[]> => {
  const client = getClient();
  const charters: ICharter[] = [];
  const { data: countryData } = await client.query({
    query: gql`
      query Charters($country: String!, $limit: Int!) {
        Charters(where: { country: { equals: $country } }, limit: $limit) {
          docs {
            id
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
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
            }
          }
        }
      }
    `,
    variables: { country: destination.country, limit: 4 },
  });
  if (countryData) charters.push(...countryData.Charters.docs);
  if (charters.length >= 4) return charters;
  const { data: continentData } = await client.query({
    query: gql`
      query Charters($continent: String!, $limit: Int!) {
        Charters(where: { continent: { equals: $continent } }, limit: $limit) {
          docs {
            id
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
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
            }
          }
        }
      }
    `,
    variables: { continent: destination.continent, limit: 4 - charters.length },
  });
  if (continentData) charters.push(...continentData.Charters.docs);
  if (charters.length >= 4) return charters;
  const { data: randomData } = await client.query({
    query: gql`
      query Charters($limit: Int!) {
        Charters(limit: $limit) {
          docs {
            id
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
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
            }
          }
        }
      }
    `,
    variables: { limit: 4 - charters.length },
  });
  if (randomData) charters.push(...randomData.Charters.docs);
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

export const fetchSimilarYachts = async (
  length: number,
): Promise<SFeatured[]> => {
  const client = getClient();
  const { data: highestClicks } = await client.query({
    query: gql`
      query Yachts {
        Yachts(sort: "clicks", limit: 4) {
          docs {
            id
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
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
      query Yachts($length: Float!) {
        Yachts(
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
            etiquette
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
      query Yachts($length: Float!) {
        Yachts(
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
            etiquette
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
    ...highestClicks.Yachts.docs,
    ...biggerLength.Yachts.docs,
    ...smallerLength.Yachts.docs,
  ];
};

export const fetchSimilarCharters = async (
  length: number,
): Promise<SFeatured[]> => {
  const client = getClient();
  const { data: highestClicks } = await client.query({
    query: gql`
      query Charters {
        Charters(sort: "clicks", limit: 4) {
          docs {
            id
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
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
      query Charters($length: Float!) {
        Charters(
          sort: "length"
          limit: 2
          where: { length: { greater_than: $length } }
        ) {
          docs {
            id
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
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
      query Charters($length: Float!) {
        Charters(
          sort: "length"
          limit: 2
          where: { length: { less_than: $length } }
        ) {
          docs {
            id
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
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
    ...highestClicks.Charters.docs,
    ...biggerLength.Charters.docs,
    ...smallerLength.Charters.docs,
  ];
};
