"use server";

import IBrokerino from "@/types/brokerino";
import { Brokerino } from "@/models/brokerino";
import codes from "@/data/CountryCodes.json";
import { revalidatePath } from "next/cache";

export const fetchBrokerino = async (kindeID: IBrokerino["kindeID"]) => {
  const res = await Brokerino.findOne({ kindeID: kindeID }).catch((e) => {
    console.log("ERROR FETCHING");
    return null;
  });
  return JSON.parse(JSON.stringify(res));
};

export const createBrokerino = async (
  formData: FormData,
  kindeID: IBrokerino["kindeID"],
  avatar: IBrokerino["avatar"],
) => {
  const rawFormData = {
    kindeID: kindeID,
    name: formData.get("name"),
    position: formData.get("position"),
    email: formData.get("email"),
    phone: [
      {
        prefix: codes[parseInt(formData.get("prefix") as string)].dial_code,
        number: formData.get("tel"),
      },
    ],
    langs: [formData.get("langs")],
    avatar: avatar,
  };

  await Brokerino.create(rawFormData);
};

export const updateBrokerino = async (
  formData: FormData,
  phone: IBrokerino["phone"] | null,
  langs: IBrokerino["langs"] | null,
  avatar: IBrokerino["avatar"] | null,
  id: IBrokerino["_id"],
) => {
  const rawFormData = {};

  if (avatar) {
    rawFormData["avatar"] = avatar;
  }
  if (formData.get("name")) {
    rawFormData["name"] = formData.get("name");
  }
  if (formData.get("position")) {
    rawFormData["position"] = formData.get("position");
  }
  if (formData.get("email")) {
    rawFormData["email"] = formData.get("email");
  }
  if (phone) {
    rawFormData["phone"] = phone;
  }
  if (langs) {
    rawFormData["langs"] = langs;
  }

  await Brokerino.findByIdAndUpdate(id, rawFormData);
};
