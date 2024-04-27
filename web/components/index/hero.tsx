import React from "react";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("index.hero");

  return (
    <div className="md:bg-left-top bg-center bg-cover bg-hero h-screen w-full overflow-hidden">
      <div className="grid grid-rows-6 h-full">
        <div className="row-span-4 flex flex-col items-start justify-end md:ml-28 ml-4 mb-28">
          <h2 className="font-classic text-white md:text-xl text-sm py-2">
            {t("subtitle")}
          </h2>
          <div className="font-slick text-4xl md:text-7xl text-white [text-wrap:balance] bg-clip-text">
            Superyachts{" "}
            <span className="font-classic inline-flex flex-col h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.6xl)*theme(lineHeight.tight))] overflow-hidden">
              <ul className="block animate-text-slide-4 text-left leading-tight [&_li]:block">
                <li>{t("sales")}</li>
                <li>CHARTER</li>
                <li>MANAGEMENT</li>
                <li>CONSTRUCTIONS</li>
                <li aria-hidden="true">{t("sales")}</li>
              </ul>
            </span>
          </div>
        </div>
        <div className="row-span-2 flex flex-col place-items-end justify-center">
          <div className={"flex flex-col md:mr-20 mx-4 mt-20"}>
            <p className="text-white font-classic text-base">
              {t.rich("undertitle", { br: () => <br /> })}
            </p>
            <div className={"flex flex-row py-5 gap-4"}>
              <button
                type={"button"}
                className="glass-button glass-button-light"
              >
                {t("CTA")}
              </button>
              <button
                type={"button"}
                className="glass-button glass-button-light"
              >
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
