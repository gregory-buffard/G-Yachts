"use server";

import IBrokerino from "@/types/brokerino";
import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const fetchBrokerinos = async (): Promise<IBrokerino[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Users {
        Users(where: { displayOnWebsite: { equals: true } }) {
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
            phones {
              prefix
              number
            }
            langs
            email
            position
          }
        }
      }
    `,
  });
  return data.Users.docs;
};
