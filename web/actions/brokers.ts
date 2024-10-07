"use server";

import IBrokers from "@/types/brokers";
import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const fetchBrokerinos = async (
    locale: "en" | "fr",
): Promise<IBrokers[]> => {
    const client = getClient();
    const { data } = await client.query({
        query: gql`
            query SellBrokers($locale: LocaleInputType!) {
                SellBrokers(
                    locale: $locale
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
    return data.SellBrokers.docs;
};
