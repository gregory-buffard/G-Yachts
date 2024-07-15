import { getClient } from "@/apollo";
import { IPartner } from "@/types/partner";
import { gql } from "@apollo/client";

export const fetchPartners = async (locale: "en" | "fr"): Promise<IPartner[]> => {
    const client = getClient();
    const { data } = await client.query({
        query: gql`
            query Partners($locale: LocaleInputType!) {
                Partners(locale: $locale) {
                    docs {
                        id
                        name
                        quote
                        comment
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
    const partners = data.Partners.docs;
    return partners;
};
