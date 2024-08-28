"use client";

import { useDestination } from "@/context/destination";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const Hero = () => {
  const { destination } = useDestination(),
    t = useTranslations("destination");

  return (
    <section
      className={
        "w-full h-[36dvh] md:h-screen bg-cover bg-center text-white uppercase"
      }
      style={{
        backgroundImage: `url(${encodeURI(destination.photos.featured.sizes.fhd.url)})`,
      }}
    >
      <div
        className={
          "w-full h-full opacity-sheet px-[4vw] md:px-[8vw] py-[2vh] md:py-[6vh] flex flex-col justify-end items-start gap-[1vh]"
        }
      >
        <h4>{t("heroSubtitle")}</h4>
        <h1 className={"font-classic normal-case"}>
          {destination.destination}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
