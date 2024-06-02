"use server";

import IBrokerino from "@/types/brokerino";
import { Brokerino } from "@/models/brokerino";
import codes from "@/data/CountryCodes.json";

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
  phone: { prefix: string; number: string }[],
) => {
  const rawFormData = {
    name: formData.get("name").length > 0,
    position: formData.get("position"),
    email: formData.get("email"),
    phone: phone,
    langs: [formData.get("langs")],
    avatar: formData.get("avatar"),
  };
};
