"use client";

import IBrokerino from "@/types/brokerino";
import { useEffect } from "react";

const Brokerino = ({ data }: { data: IBrokerino | boolean }) => {
  useEffect(() => {
    console.log("DATA HERES", data);
  }, [data]);
  return (
    <div
      className={"size-[4vh] absolute right-[2vw] top-[2vw] bg-stone-50"}
    ></div>
  );
};

export default Brokerino;
