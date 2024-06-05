"use client";

import { useDestination } from "@/context/destination";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

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
    <section className="w-full md:w-5/6 my-32 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-2xl font-light">{destination.country}</h3>
        <h1 className="text-4xl">
          {t("explore")} <span className="classic">{destination.destination}</span>
        </h1>
        <p className="mt-10 lg:mr-20 text-justify" dangerouslySetInnerHTML={{ __html: destination.description }} />
        <div className="mt-10 grid grid-cols-2 gap-4">
          {info.map((item, index) => (
            <InfoRow key={index} {...item} />
          ))}
        </div>
        <Link className="glass-button mt-10" href={"/charters"}>
          {t("button")}
        </Link>
      </div>
      <img
        src={`${process.env.NEXT_PUBLIC_API}/images/destinations/${destination._id}/${destination.photos.destinationPhoto}`}
        alt={destination.destination}
        className="h-96 md:h-auto object-cover object-center bg-sky-400"
      />
    </section>
  );
};

const InfoRow = ({ icon, title, value }: { icon: string; title: string; value: string }) => {
  return (
    <div className="flex flex-row">
      <img src={icon} alt={title} className="w-8 h-8 mr-4" />
      <div className="flex flex-col">
        <h4 className="text-lg">{title}</h4>
        <p className="uppercase text-gray-400">{value}</p>
      </div>
    </div>
  );
};

export default Details;
