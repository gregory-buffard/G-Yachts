"use server";

import IBrokerino from "@/types/brokerino";
import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const fetchBrokerinos = async (
  locale: "en" | "fr",
): Promise<IBrokerino[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Users($locale: LocaleInputType!) {
        Users(
          locale: $locale
          where: { displayOnWebsite: { equals: true } }
          limit: 0
        ) {
          docs {
            name
            indexField
            picture {
              alt
              sizes {
                fhd {
                  url
                  width
                  height
                }
              }
            }
            socials {
              link
              platform
            }
            phones {
              number
              prefix
            }
            langs
            email
            position
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });

  return [...data.Users.docs].sort(
    (a: IBrokerino, b: IBrokerino) => a.indexField - b.indexField,
  );
};
