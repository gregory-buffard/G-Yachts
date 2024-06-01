"use server"

import YachtList from "@/components/yachts/yachtList";
import {fetchYachts} from "@/actions/yachts";

const Yachts = async () => {

  return (
    <section
      className={
        "containerize h-screen flex max-md:flex-col flex-row max-md:justify-start max-md:items-start justify-center items-start gap-[2vh]"
      }
    >
        <YachtList/>
    </section>
  );
};

export default Yachts;
