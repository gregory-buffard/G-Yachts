"use client";

import { useEvent } from "@/context/event";
import { useFormatter } from "next-intl";
import { ContentRenderer } from "@/components/article/content";

const Detail = () => {
  const { location } = useEvent(),
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
        "containerize h-max py-[4vh] flex md:flex-row flex-col justify-between items-stretch"
      }
    >
      <aside
        className={
          "md:w-1/5 w-full flex flex-col justify-start items-start gap-[4vh]"
        }
      >
        <div
          className={
            "w-full flex flex-col justify-center items-start uppercase"
          }
        >
          <p>Date</p>
          <h3
            className={"font-slick font-normal text-2xl"}
          >{`${formattedFromDate} – ${formattedToDate} ${month}, ${year}`}</h3>
        </div>
        <div className={"w-full flex flex-col justify-center items-start"}>
          <p className={"uppercase"}>Location</p>
          <h3
            className={"font-slick font-normal text-2xl"}
          >{`${location.city}, ${location.country}`}</h3>
        </div>
      </aside>
      <div
        className={
          "md:w-[0.25vh] md:h-auto h-[0.25vh] w-full bg-rock-500 md:my-0 my-[4vh]"
        }
      />
      <article className={"md:w-3/5 w-full flex justify-start items-start"}>
        <ContentRenderer blocks={useEvent().content} />
      </article>
    </section>
  );
};

export default Detail;
