"use client";

import { useNewConstruction } from "@/context/newConstruction";
import { useViewContext } from "@/context/view";
import { convertUnit, formatCurrency } from "@/utils/yachts";
import { useTranslations } from "next-intl";

const Hero = () => {
    const { yacht } = useNewConstruction(),
        { units, rates, currency } = useViewContext(),
        t = useTranslations("yacht");
    return (
        <section
            className={
                "w-full px-[4vw] md:px-[8vw] h-[36dvh] md:h-screen bg-cover bg-center flex flex-col justify-end items-start text-white uppercase py-[2vh] md:py-[6vh]"
            }
            style={{
                backgroundImage: `url(${yacht.photos.featured.sizes.fhd.url})`,
            }}>
            <p className={"bg-white px-[1.5vw] py-2 rounded-md text-black mb-3 md:mb-6 text-xs md:text-base"}>{t("delivery")} {yacht.delivery}</p>
            <h1 className={"font-classic normal-case"}>{yacht.name}</h1>
            <p>
                {yacht.builder} | {convertUnit(yacht.length, units.length)} | {yacht.yearBuilt} |{" "}
                {yacht.sleeps + " " + t("sleeps")}
            </p>
            <p>{formatCurrency(yacht.price * rates[currency], currency)}</p>
        </section>
    );
};

export default Hero;
