"use client";

import { useDestination } from "@/context/destination";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const Hero = () => {
  const { destination } = useDestination(),
    t = useTranslations("destination"),
    params = useParams();

  return (
    <section
      className={
        "w-full px-[4vw] md:px-[8vw] h-[36dvh] md:h-screen bg-cover bg-center flex flex-col justify-end items-start text-white uppercase py-[2vh] md:py-[6vh]"
      }
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_API}/images/destinations/${params.id}/${destination.photos.featured})`,
      }}>
      <h4>{t("heroSubtitle")}</h4>
      <h1 className={"font-classic normal-case"}>{destination.destination}</h1>
    </section>
  );
};

export default Hero;
