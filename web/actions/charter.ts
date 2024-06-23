"use server";

import { ICharter } from "@/types/charter";
import { IFeatured } from "@/types/charter";
import { IDestination } from "@/types/destination";
import axios from "axios";
import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const fetchFeatured = async () => {
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
                            langs {
                                lang
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
            }
        `,
    });
    const charters: ICharter[] = data.Charters.docs.map(remapChartersPhotos);
    return charters;
};
const remapChartersPhotos = (charter: any): ICharter => {
    return {
        ...charter,
        photos: {
            featured: charter.photos.featured.url,
            gallery: charter.photos.gallery.map((photo: any) => photo.image.url),
        },
        keyFeatures: charter.keyFeatures.map((feature: any) => feature.keyFeature),
        broker: {
            ...charter.broker,
            langs: charter.broker.langs.map((lang: any) => lang.lang),
        },
    };
};

export const fetchGallery = async ({
    type,
    id,
    query,
}: {
    type: "sales" | "charters";
    id: string;
    query: string;
}) => {
    const res = await axios
        .get(`${process.env.API_URL}/charters/images/${id}`, {
            data: { type: type, target: query },
        })
        .catch((e) => {
            throw e;
        });
    return res.data;
};

export const fetchListing = async () => {
    const client = getClient();
    const { data } = await client.query({
        query: gql`
            query Charters {
                Charters {
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
                            langs {
                                lang
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
            }
        `,
    });
    const charters: ICharter[] = data.Charters.docs.map(remapChartersPhotos);
    return charters;
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
                        langs {
                            lang
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
        variables: { id: id },
    });
    const charter: ICharter = remapChartersPhotos(data.Charter);
    return charter;
};

export const getRate = async (currency: string) => {
    if (currency === "EUR") return 1;
    try {
        const res = await axios.get(
            `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=${currency}&base_currency=EUR`
        );
        return 1 * res.data.data[currency];
    } catch (e) {
        console.error("Error fetching currency");
        return 1;
    }
};

export const fetchChartersForDestination = async (
    destination: IDestination
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
                            langs {
                                lang
                            }
                        }
                    }
                }
            }
        `,
        variables: { country: destination.country, limit: 4 },
    });
    if (countryData) {
        const countryCharters: IFeatured[] = countryData.Charters.docs.map(remapChartersPhotos);
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
                            langs {
                                lang
                            }
                        }
                    }
                }
            }
        `,
        variables: { continent: destination.continent, limit: 4 - charters.length },
    });
    if (continentData) {
        const continentCharters: IFeatured[] = continentData.Charters.docs.map(remapChartersPhotos);
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
                            langs {
                                lang
                            }
                        }
                    }
                }
            }
        `,
        variables: { limit: 4 - charters.length },
    });
    if (!randomData) return charters;
    const randomCharters: IFeatured[] = randomData.Charters.docs.map(remapChartersPhotos);
    charters.push(...randomCharters);
    return charters;
};
