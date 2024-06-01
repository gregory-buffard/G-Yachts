"use server";

import IBrokerino from "@/types/brokerino";
import { Brokerino } from "@/models/brokerino";

export const fetchBrokerino = async (kindeID: IBrokerino["kindeID"]) => {
  const found = await Brokerino.exists({ kindeID: kindeID }).catch((e) => {
    console.log(e);
    return false;
  });
  if (found) {
    return await Brokerino.findOne({ kindeID: kindeID }).catch((e) => {
      console.log(e);
      return false;
    });
  } else {
    return false;
  }
};

export const createBrokerino = async (
  formData: FormData,
  kindeID: IBrokerino["kindeID"],
) => {
  const rawFormData = {
    kindeID: kindeID,
    name: formData.get("name"),
    position: formData.get("position"),
    email: formData.get("email"),
    phone: [formData.get("tel")],
    langs: [formData.get("langs")],
    avatar: "temp",
  };

  await Brokerino.create(rawFormData);
};
