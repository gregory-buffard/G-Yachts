"use server";

import { Yacht } from "@/models/yacht";
import axios from "axios";

export const fetchYachts = async () => {
  return await Yacht.find()
    .select("_id name price builder yearBuilt featured")
    .catch((e) => {
      throw e;
    });
};

export const fetchYacht = async ({ id }: { id: string }) => {
  return await Yacht.findById(id).catch((e) => {
    throw e;
  });
};

export const fetchGallery = async ({ route }: { route: string }) => {
  console.log("ROUTE", `${process.env.API_URL}/yachts/images/${route}`);
  const res = await axios
    .get(`${process.env.API_URL}/yachts/images/${route}`)
    .catch((e) => {
      throw e;
    });
  return res.data;
};

export const fetchFeatured = async () => {
  return await Yacht.find({ featured: true })
    .select("_id name price builder length yearBuilt sleeps")
    .catch((e) => {
      throw e;
    });
};
