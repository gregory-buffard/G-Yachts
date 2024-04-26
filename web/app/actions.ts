"use server";

import axios from "axios";
import { formatCurrency } from "@/utils/yachts";

export const fetchFeatured = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/yachts/featured`,
    );
    return res.data;
  } catch (e) {
    console.error("Error fetching featured yachts: ", e);
    throw e;
  }
};

export const convertCurrency = async (amount: number, currency: string) => {
  if (currency === "EUR") return formatCurrency(amount, currency);
  try {
    const res = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY}&currencies=${currency}&base_currency=EUR`,
    );
    return formatCurrency(amount * res.data.data[currency], currency);
  } catch (e) {
    console.error("Error fetching currency: ", e);
    return formatCurrency(amount, currency);
  }
};
