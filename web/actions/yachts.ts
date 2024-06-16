"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { IYacht, Yacht } from "@/models/yacht";
import axios from "axios";

export const fetchFeatured = async () => {
    const client = getClient();
    const { data } = await client.query({
        query: gql`
            query Yachts {
                Yachts(where: { featured: { equals: true } }) {
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
                        updatedAt
                        createdAt
                        broker {
                            name
                            email
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
    const yachts: IYacht[] = data.Yachts.docs.map((yacht: any) => remapYachtPhotos(yacht));
    return yachts;
};

const remapYachtPhotos = (yacht: any) => {
    return {
        ...yacht,
        photos: {
            featured: yacht.photos.featured.url,
            gallery: yacht.photos.gallery.map((photo: any) => photo.image.url),
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
        .get(`${process.env.API_URL}/yachts/images/${id}`, {
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
            query Yachts {
                Yachts {
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
                        updatedAt
                        createdAt
                        broker {
                            name
                            email
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
    const yachts: IYacht[] = data.Yachts.docs.map((yacht: any) => remapYachtPhotos(yacht));
    return yachts;
};

export const fetchYacht = async (id: string) => {
    const client = getClient();
    const { data } = await client.query({
        query: gql`
            query Yacht($id: ID!) {
                Yacht(id: $id) {
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
                    updatedAt
                    createdAt
                    broker {
                        name
                        email
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
        variables: { id },
    });
    const yacht: IYacht = remapYachtPhotos(data.Yacht);
    return yacht;
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
