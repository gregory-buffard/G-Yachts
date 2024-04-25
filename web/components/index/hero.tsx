import React from "react";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("index.hero");

  return (
    <div className="relative bg-left-top bg-cover bg-hero-bg-image h-screen w-full overflow-hidden">
      <div className="absolute bottom-10 right-10 h-32 w-128">
        <h3 className="text-white text-lg font-classic mb-4 break-words">
          {t("undertitle")}
        </h3>
        <button type={"button"} className={"glass-button mr-4"}>
          {t("CTA")}
        </button>
        <button type={"button"} className={"glass-button"}>
          {t("CTA2")}
        </button>
      </div>
      <div className="min-h-screen flex flex-col items-start  overflow-hidden">
        <div className="flex flex-col py-96 px-56 md:text-2xl">
          <h2 className="font-classic text-white text-left bg-clip-text">
            {t("subtitle")}
          </h2>
          <div className="font-slick text-5xl md:text-6xl text-white text-left[text-wrap:balance] bg-clip-text">
            Superyachts{" "}
            <span className="font-classic inline-flex flex-col h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.6xl)*theme(lineHeight.tight))] overflow-hidden">
              <ul className="block animate-text-slide-4 text-left leading-tight [&_li]:block">
                <li>SALES</li>
                <li>CHARTER</li>
                <li>MANAGEMENT</li>
                <li>NEW CONSTRUCTIONS</li>
                <li aria-hidden="true">SALES</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
