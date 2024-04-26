import React from "react";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("hero");
  return (
    <div className="md:bg-left-top sm:bg-center bg-cover bg-hero-bg-image h-screen w-full overflow-hidden">
      <div className="grid grid-rows-6 h-full">
        <div className="row-span-4 flex flex-col items-start justify-end md:ml-28 sm:ml-16 mb-28">
          <h2 className="font-classic text-white md:text-xl">
            {t("subtitle")}
          </h2>
          <div className="font-slick text-5xl md:text-7xl text-white [text-wrap:balance] bg-clip-text">
            Superyachts{" "}
            <span className="font-classic inline-flex flex-col h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.6xl)*theme(lineHeight.tight))] overflow-hidden">
              <ul className="block animate-text-slide-4 text-left leading-tight [&_li]:block">
                <li>SALES</li>
                <li>CHARTER</li>
                <li>MANAGEMENT</li>
                <li>CONSTRUCTIONS</li>
                <li aria-hidden="true">SALES</li>
              </ul>
            </span>
          </div>
        </div>
        <div className="row-span-2 flex flex-col items-end justify-center h-full">
          <div className={"flex flex-col mt-24 md:-mr-20 md:ml-10 sm:ml-20"}>
            <p className="text-white font-classic md:w-8/12 sm:w-5/6">
              {t("undertitle")}
            </p>
            <div className={"flex flex-row gap-2 py-5 float-left"}>
              <button type={"button"} className="glass-button">
                {t("CTA")}
              </button>
              <button type={"button"} className="glass-button">
                {t("CTA2")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
