"use server";

import axios from "axios";

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
  if (currency === "EUR") return amount;
  try {
    const res = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=${currency}&base_currency=EUR`,
    );
    return amount * res.data.data[currency];
  } catch (e) {
    console.error("Error fetching currency: ", e);
    return amount;
  }
};
