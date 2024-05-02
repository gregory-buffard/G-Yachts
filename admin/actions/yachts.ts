"use server";

import { Yacht } from "@/models/yacht";

export const fetchFeatured = async () => {
  return await Yacht.find({ featured: true })
    .select("_id name price builder length yearBuilt sleeps")
    .catch((e) => {
      throw e;
    });
};
