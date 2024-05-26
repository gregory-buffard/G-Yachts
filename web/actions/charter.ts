"use server";

import { Charter } from "@/models/charter";
import axios from "axios";

export const fetchFeatured = async () => {
  return await Charter.find({ featured: true })
    .select("_id name price builder length yearBuilt sleeps photos")
    .catch((e) => {
      throw e;
    });
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
  return await Charter.find({})
    .select("_id name category price builder length yearBuilt sleeps photos")
    .catch((e) => {
      throw e;
    });
};

export const fetchCharter = async (id: string) => {
  return await Charter.findById(id).catch((e) => {
    throw e;
  });
};

export const getRate = async (currency: string) => {
  if (currency === "EUR") return 1;
  try {
    const res = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=${currency}&base_currency=EUR`,
    );
    return 1 * res.data.data[currency];
  } catch (e) {
    console.error("Error fetching currency: ", e);
    return 1;
  }
};
