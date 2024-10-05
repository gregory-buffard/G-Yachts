"use server";

import ISolds from "@/types/solds";
import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const fetchSolds = async (): Promise<ISolds[]> => {
    const client = getClient();
    const { data } = await client.query({
        query: gql`
            query Solds {
                Solds {
                    docs {
                        name
                        price
                        yearBuilt
                        length
                        sleeps
                        builder
                        picture {
                            alt
                            sizes {
                                fhd {
                                    url
                                    width
                                    height
                                }
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
        `,
    });
    return data.Solds.docs;
}
