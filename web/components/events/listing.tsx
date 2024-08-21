"use client";

import IEvent from "@/types/event";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { useFormatter } from "next-intl";
import { useState } from "react";

const Grid = ({ data }: { data: IEvent[] }) => {
  const t = useTranslations("events");
  const format = useFormatter();

  return (
    <div
      className={
        "w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[2vw] gap-y-[8vh]"
      }
    >
      {data.map((event) => {
        const fromDate = new Date(event.fromDate),
          toDate = new Date(event.toDate),
          formattedFromDate = format.dateTime(fromDate, {
            day: "numeric",
          }),
          formattedToDate = format.dateTime(toDate, {
            day: "numeric",
          }),
          month = format.dateTime(toDate, {
            month: "long",
          });

        return (
          <Link
            href={{ pathname: "/events/[id]", params: { id: event.id } }}
            key={event.title}
            className={"flex flex-col justify-center items-start gap-[2vh]"}
          >
            <Image
              src={encodeURI(event.image.sizes.fhd.url)}
              width={event.image.sizes.fhd.width}
              height={event.image.sizes.fhd.height}
              alt={event.image.alt}
              className={"w-full h-[56vh] object-cover object-center"}
            />
            <div
              className={
                "w-full flex flex-col justify-center items-start gap-[1vh]"
              }
            >
              <p
                className={"uppercase"}
              >{`${formattedFromDate} – ${formattedToDate} ${month}`}</p>
              <h3 className={"font-slick normal-case font-light"}>
                {event.title}
              </h3>
              <Link
                href={{ pathname: "/events/[id]", params: { id: event.id } }}
              >
                <p
                  className={
                    "uppercase text-rock-500 underline underline-offset-2"
                  }
                >
                  {t("more")}
                </p>
              </Link>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Listing = ({ data }: { data: IEvent[] }) => {
  const t = useTranslations("events"),
    [maxListing, setMaxListing] = useState<number>(6);

  const upcoming = data.filter((event) => new Date(event.toDate) >= new Date()),
    past = data.filter((event) => new Date(event.toDate) < new Date());

  return (
    <section
      className={
        "w-full px-[8vw] py-[8vh] flex flex-col justify-start items-center gap-[4vh]"
      }
    >
      <h2 className={"w-full font-slick font-light"}>
        {t.rich("upcoming", {
          classic: (chunks) => (
            <span className={"font-classic uppercase"}>{chunks}</span>
          ),
        })}
      </h2>

      <Grid data={upcoming} />

      <h2 className={"w-full font-slick font-light"}>
        {t.rich("past", {
          classic: (chunks) => (
            <span className={"font-classic uppercase"}>{chunks}</span>
          ),
        })}
      </h2>

      <Grid data={past.slice(0, maxListing)} />

      <p>
        {maxListing >= past.length
          ? t("end")
          : t("listed", {
              count: maxListing,
              total: past.length,
            })}
      </p>

      {maxListing < past.length && (
        <>
          <div
            className={
              "w-[48vw] h-[0.25vh] bg-rock-300 [transition:_width_500ms_ease-in-out]"
            }
          >
            <div
              className={"h-full bg-black"}
              style={{
                width: `${(maxListing / past.length) * 100}%`,
              }}
            />
          </div>
          <button
            type={"button"}
            onClick={() => setMaxListing(maxListing + 6)}
            className={"glass-button glass-button-dark"}
          >
            {t("expand")}
          </button>
        </>
      )}
    </section>
  );
};

export default Listing;
