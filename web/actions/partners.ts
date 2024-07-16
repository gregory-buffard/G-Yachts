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
            }
        `,
        variables: {
            locale,
        },
    });
    const partners = data.Partners.docs;
    return partners;
};

export const fetchPartner = async (locale: "en" | "fr", id: string): Promise<IPartner> => {
    const client = getClient();
    const { data } = await client.query({
        query: gql`
            query Partner($locale: LocaleInputType!, $id: String!) {
                Partner(id: $id, locale: $locale) {
                    id
                    name
                    quote
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
