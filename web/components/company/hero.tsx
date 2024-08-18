import React from "react";
import { useTranslations } from "next-intl";
import hero from "@/public/images/company/hero.webp";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations("company.hero");
  return (
    <div className="h-full md:h-screen w-full overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className={"bg-rock-100"}>
          <div className={"py-[18vw] px-[10vw]"}>
            <h4 className={"text-black font-classic"}>{t("subtitle")}</h4>
            <h1>
              {t.rich("title", {
                classic: (chunks) => (
                  <span className={"font-classic font-normal uppercase"}>
                    <br className={"hidden lg:block"} />
                    {chunks}
                  </span>
                ),
              })}
            </h1>
            <p
              className={
                "md:w-[30vw] w-[80vw] pt-5 font-classic font-light text-justify"
              }
            >
              {t("description")}
            </p>
            <p
              className={
                "md:w-[30vw] w-[80vw] py-5 font-classic font-light text-justify"
              }
            >
              {t("description2")}
            </p>
          </div>
        </div>
        <Image
          src={hero}
          alt={"Yacht"}
          className={"object-cover md:h-screen"}
        />
      </div>
    </div>
  );
};

export default Hero;
