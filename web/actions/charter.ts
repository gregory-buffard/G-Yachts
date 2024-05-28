"use server";

import { Charter, ICharter } from "@/models/charter";
import { IFeatured } from "@/types/charter";
import { IDestination } from "@/types/destination";
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
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=${currency}&base_currency=EUR`
    );
    return 1 * res.data.data[currency];
  } catch (e) {
    console.error("Error fetching currency: ", e);
    return 1;
  }
};

export const fetchChartersForDestination = async (
  destination: IDestination
): Promise<IFeatured[]> => {
  const selectFields = "_id name price builder photos length yearBuilt sleeps";
  const charters: IFeatured[] = [];
  // Country
  const countryCharters = await Charter.find({ country: destination.country })
    .select(selectFields)
    .limit(4)
    .catch((e) => {
      throw e;
    });
  charters.push(...countryCharters);
  if (charters.length >= 4) return charters;
  // Continent
  const continentCharters = await Charter.find({ continent: destination.continent })
    .select(selectFields)
    .limit(4 - charters.length)
    .catch((e) => {
      throw e;
    });
  charters.push(...continentCharters);
  if (charters.length >= 4) return charters;
  // Random charters
  const randomCharters = await Charter.aggregate([{ $sample: { size: 4 - charters.length } }]);
  charters.push(...randomCharters);
  return charters;
};
