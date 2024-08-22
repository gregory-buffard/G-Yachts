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

  const Gaspard = data.Users.docs.find(
      (doc: IBrokerino) => doc.name === "Gaspard Milazzo",
    ),
    rest = data.Users.docs
      .filter((doc: IBrokerino) => doc.name !== "Gaspard Milazzo")
      .reverse();

  return Gaspard ? [Gaspard, ...rest] : rest;
};
