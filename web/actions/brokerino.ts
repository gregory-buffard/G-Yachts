"use server";

import { Brokerino } from "@/models/brokerino";
import { IYacht } from "@/types/yacht";

export const fetchBrokerino = async (email: IYacht["brokerEmail"]) => {
  const res = await Brokerino.findOne({ email }).catch((e) => {
    throw e;
  });

  return JSON.parse(JSON.stringify(res));
};
