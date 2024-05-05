"use server";

import { Yacht } from "@/models/yacht";
import axios from "axios";
import { revalidatePath } from "next/cache";

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

export const fetchGallery = async ({
  type,
  id,
  query,
}: {
  type: "sales" | "charter";
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

export const changeFeatured = async ({
  type,
  id,
  photo,
}: {
  type: "sales" | "charter";
  id: string;
  photo: string;
}) => {
  const res = await axios
    .put(`${process.env.API_URL}/yachts/images/${id}`, {
      type,
      photo,
    })
    .catch((e) => {
      throw e;
    });
  revalidatePath(`/${id}`);
  return res.status;
};

export const fetchFeatured = async () => {
  return await Yacht.find({ featured: true })
    .select("_id name price builder length yearBuilt sleeps")
    .catch((e) => {
      throw e;
    });
};
