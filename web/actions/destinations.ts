"use server";

import { Destination } from "@/models/destination";

export const fetchDestination = async (id: string) => {
  return await Destination.findById(id).catch((e) => {
    throw e;
  });
};

export const fetchDestinations = async () => {
  return await Destination.find()
    .select("_id country region continent photos coordinates destination")
    .catch((e) => {
      throw e;
    });
};
