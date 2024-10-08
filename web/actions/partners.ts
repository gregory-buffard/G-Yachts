import { getClient } from "@/apollo";
import { IPartner } from "@/types/partner";
import { gql } from "@apollo/client";

export const fetchPartners = async (
  locale: "en" | "fr",
): Promise<IPartner[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Partners($locale: LocaleInputType!) {
        Partners(locale: $locale, limit: 0) {
          docs {
            id
            name
            comment
            website
            indexField
            logo {
              url
              alt
              sizes {
                thumbnail {
                  url
                }
                fhd {
                  url
                }
              }
            }
            banner {
              id
              url
              sizes {
                thumbnail {
                  url
                }
                fhd {
                  url
                }
              }
            }
            seo {
              value
            }
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });

  return [...data.Partners.docs].sort(
    (a: IPartner, b: IPartner) => a.indexField - b.indexField,
  );
};

export const fetchPartner = async (
  locale: "en" | "fr",
  id: string,
): Promise<IPartner> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Partner($locale: LocaleInputType!, $id: String!) {
        Partner(id: $id, locale: $locale) {
          id
          name
          comment
          website
          logo {
            url
            alt
            sizes {
              thumbnail {
                url
              }
              fhd {
                url
              }
            }
          }
          banner {
            id
            url
            sizes {
              thumbnail {
                url
              }
              fhd {
                url
              }
            }
          }
          seo {
            value
          }
        }
      }
    `,
    variables: {
      locale,
      id,
    },
  });
  return data.Partner;
};
