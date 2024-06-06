"use client";

import { useYacht } from "@/context/yacht";
import { useViewContext } from "@/context/view";
import { useParams } from "next/navigation";
import { convertUnit, formatCurrency } from "@/utils/yachts";
import { useTranslations } from "next-intl";

const Hero = () => {
  const { yacht } = useYacht(),
    { units, rates, currency } = useViewContext(),
    t = useTranslations("yacht"),
    params = useParams();

  return (
    <section
      className={
        "w-full px-[4vw] md:px-[8vw] h-[36dvh] md:h-screen bg-cover bg-center flex flex-col justify-end items-start text-white uppercase py-[2vh] md:py-[6vh]"
      }
      style={{
        backgroundImage: `url(${yacht.photos.featured})`,
      }}
    >
      <h1 className={"font-classic normal-case"}>{yacht.name}</h1>
      <p>
        {yacht.builder} | {convertUnit(yacht.length, units.length)} |{" "}
        {yacht.yearBuilt} | {yacht.sleeps + " " + t("sleeps")}
      </p>
      <p>{formatCurrency(yacht.price * rates[currency], currency)}</p>
    </section>
  );
};

export default Hero;
