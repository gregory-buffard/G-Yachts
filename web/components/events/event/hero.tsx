"use client";

import { useEvent } from "@/context/event";
import { useFormatter } from "next-intl";

const Hero = () => {
  const { image, title } = useEvent(),
    format = useFormatter(),
    fromDate = new Date(useEvent().fromDate),
    toDate = new Date(useEvent().toDate),
    formattedFromDate = format.dateTime(fromDate, {
      day: "numeric",
    }),
    formattedToDate = format.dateTime(toDate, {
      day: "numeric",
    }),
    month = format.dateTime(toDate, {
      month: "long",
    }),
    year = format.dateTime(toDate, {
      year: "numeric",
    });

  return (
    <section
      className={
        "w-full lg:h-screen h-[50vh] flex justify-center items-center bg-cover bg-center"
      }
      style={{
        backgroundImage: `url(${image.sizes.fhd.url})`,
      }}
    >
      <div
        className={
          "containerize h-full py-[6vh] flex flex-col justify-end items-start bg-black/25 text-white"
        }
      >
        <p
          className={"uppercase"}
        >{`${formattedFromDate} – ${formattedToDate} ${month}, ${year}`}</p>
        <h1>{title}</h1>
      </div>
    </section>
  );
};

export default Hero;
