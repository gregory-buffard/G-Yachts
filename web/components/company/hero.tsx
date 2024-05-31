import React from "react";
import { useTranslations } from "next-intl";
import herox from "@/public/imagery/optimized/index/herox.webp";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations("company.hero");
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="grid grid-cols-2">
        <div className={"bg-rock-100 "}>
            <div>
                <h1 className={"font-classic font-light text-3xl md:text-6xl text-black"}>
                    {t("subtitle")}
                </h1>
            </div>
        </div>
        <Image src={herox} alt={"Yacht"} className={"object-cover h-screen"}/>
      </div>
    </div>
    );
}

export default Hero;