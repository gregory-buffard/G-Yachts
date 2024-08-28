"use client";

import { useDestination } from "@/context/destination";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ContentRenderer } from "@/components/article/content";

const Details = () => {
  const { destination } = useDestination();
  const t = useTranslations("destination.details");

  const info = [
    {
      icon: "/icons/sun.svg",
      title: t("bestTimeTiVisit"),
      value: destination.info.bestTimeToVisit,
    },
    {
      icon: "/icons/languages.svg",
      title: t("languages"),
      value: destination.info.languages,
    },
    {
      icon: "/icons/gettingThere.svg",
      title: t("gettingThere"),
      value: destination.info.gettingThere,
    },
    {
      icon: "/icons/currency.svg",
      title: t("currency"),
      value: destination.info.currency,
    },
  ];

  return (
    <section className="w-full md:w-5/6 my-[4vh] md:my-[8vh] px-[4vw] md:px-[2vw] flex justify-center items-start flex-col lg:flex-row gap-[8vh] lg:gap-[4vw]">
      <div className="flex flex-col justify-start items-start gap-[4vh]">
        <div className={"flex flex-col justify-start items-start"}>
          <h4 className={"font-normal"}>{destination.country}</h4>
          <h2 className={"font-slick font-light py-[1vh]"}>
            {t("explore")}{" "}
            <span className="font-classic uppercase font-medium">
              {destination.destination}
            </span>
          </h2>
        </div>
        <div className="lg:mr-20">
          <ContentRenderer blocks={destination.description} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {info.map((item, index) => (
            <InfoRow key={index} {...item} />
          ))}
        </div>
        <Link className="glass-button" href={"/charters"}>
          {t("button")}
        </Link>
      </div>
      <Image
        src={`${encodeURI(destination.photos.destinationPhoto.sizes.fhd.url)}`}
        alt={destination.photos.destinationPhoto.alt}
        width={destination.photos.destinationPhoto.sizes.fhd.width}
        height={destination.photos.destinationPhoto.sizes.fhd.height}
        className="w-full lg:w-1/2 object-cover object-center bg-sky-400"
      />
    </section>
  );
};

const InfoRow = ({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) => {
  return (
    <div className="flex flex-row">
      <Image
        src={icon}
        alt={title}
        width={32}
        height={32}
        className="size-8 mr-4"
      />
      <div className="flex flex-col">
        <h4>{title}</h4>
        <p className="text-rock-300">{value}</p>
      </div>
    </div>
  );
};

export default Details;
