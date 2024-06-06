"use client";

import { useCharter } from "@/context/charter";
import { useViewContext } from "@/context/view";
import { useParams } from "next/navigation";
import { convertUnit, formatCurrency } from "@/utils/yachts";
import { useTranslations } from "next-intl";

const Hero = () => {
  const { charter } = useCharter(),
    { units, rates, currency } = useViewContext(),
    t = useTranslations("charter"),
    params = useParams();

  return (
    <section
      className={
        "w-full px-[4vw] md:px-[8vw] h-[36dvh] md:h-screen bg-cover bg-center flex flex-col justify-end items-start text-white uppercase py-[2vh] md:py-[6vh]"
      }
      style={{
        backgroundImage: `url(${charter.photos.featured})`,
      }}
    >
      <h1 className={"font-classic normal-case"}>{charter.name}</h1>
      <p>
        {charter.builder} | {convertUnit(charter.length, units.length)} |{" "}
        {charter.yearBuilt} | {charter.sleeps + " " + t("sleeps")}
      </p>
      <p>{formatCurrency(charter.price * rates[currency], currency)}</p>
    </section>
  );
};

export default Hero;
