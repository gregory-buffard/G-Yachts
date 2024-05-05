"use server";

import { Yacht } from "@/models/yacht";
import { formatCurrency } from "@/utils/yachts";
import axios from "axios";

export const fetchFeatured = async () => {
  return await Yacht.find({ featured: true })
    .select("_id name price builder length yearBuilt sleeps")
    .catch((e) => {
      throw e;
    });
};

export const fetchListing = async () => {
  return await Yacht.find({})
    .select("_id name price builder length yearBuilt sleeps")
    .catch((e) => {
      throw e;
    });
};

export const convertCurrency = async (amount: number, currency: string) => {
  if (currency === "EUR") return formatCurrency(amount, currency);
  try {
    const res = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=${currency}&base_currency=EUR`,
    );
    return formatCurrency(amount * res.data.data[currency], currency);
  } catch (e) {
    console.error("Error fetching currency: ", e);
    return formatCurrency(amount, currency);
  }
};
