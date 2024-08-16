"use client";

import { useYacht } from "@/context/yacht";
import { useViewContext } from "@/context/view";
import { useParams } from "next/navigation";
import { convertUnit, formatCurrency } from "@/utils/yachts";
import { useTranslations } from "next-intl";

const Hero = () => {
  const { data, type } = useYacht(),
    { units, rates, currency } = useViewContext(),
    t = useTranslations("yacht"),
    params = useParams();

  return (
    <section
      className={
        "w-full px-[4vw] md:px-[8vw] h-[36dvh] md:h-screen bg-cover bg-center flex flex-col justify-end items-start text-white uppercase py-[2vh] md:py-[6vh]"
      }
      style={{
        backgroundImage: `url(${encodeURI(data.photos.featured.sizes.fhd.url)})`,
      }}
    >
      {type === "new-construction" && (
        <p
          className={
            "bg-white px-[1.5vw] py-2 rounded-md text-black mb-3 md:mb-6 text-xs md:text-base"
          }
        >
          {t("delivery")} {data.delivery}
        </p>
      )}
      <h1 className={"font-classic normal-case"}>{data.name}</h1>
      <p>
        {data.builder} | {convertUnit(data.length, units.length)} |{" "}
        {data.yearBuilt} | {data.sleeps + " " + t("sleeps")}
      </p>
      {type === "charter" ? (
        <p>{`${formatCurrency(data.price.low * rates[currency], currency)} – ${formatCurrency(data.price.high * rates[currency], currency)}`}</p>
      ) : (
        <p>{formatCurrency(data.price * rates[currency], currency)}</p>
      )}
    </section>
  );
};

export default Hero;
