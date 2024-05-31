"use server";

import IBrokerino from "@/types/brokerino";
import { Brokerino } from "@/models/brokerino";

export const fetchBrokerino = async (kindeID: IBrokerino["kindeID"]) => {
  return await Brokerino.findOne({ kindeID }).catch((e) => {
    console.log(e);
    return false;
  });
};
