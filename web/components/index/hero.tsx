import React from "react";
import Scrolldown from "@/components/index/scrolldown";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const Hero = () => {
  const t = useTranslations("index.hero");

  return (
    <div className="h-[90vh] md:h-screen w-full overflow-hidden">
      <video
        src="/videos/hero.webm"
        autoPlay
        loop
        muted
        preload={"none"}
        className="absolute w-full h-[90vh] md:h-screen object-cover object-center"
        playsInline
      />
      <Scrolldown />
      <div className="grid grid-rows-6 h-full relative">
        <div className="row-span-4 flex flex-col items-start justify-end md:ml-28 lg:ml-26 xl:ml-56 ml-4 mb-28">
          <h2 className="font-classic text-white md:text-sm lg:text-xl text-sm py-2">
            {t("subtitle")}
          </h2>
          <div className="font-slick font-light text-[3.5vh] md:text-4xl lg:text-6xl text-white [text-wrap:balance] bg-clip-text">
            Superyachts{" "}
            <span className="font-classic font-medium inline-flex flex-col h-[calc(3vh*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.6xl)*theme(lineHeight.tight))] overflow-hidden">
              <ul className="block animate-text-slide-4 text-left leading-tight [&_li]:block">
                <li>{t("sales")}</li>
                <li>CHARTER</li>
                <li>MANAGEMENT</li>
                <li>NEW CONSTRUCTIONS</li>
                <li aria-hidden="true">{t("sales")}</li>
              </ul>
            </span>
          </div>
        </div>
        <div className="row-span-2 flex flex-col place-items-end justify-center">
          <div className={"flex flex-col md:mr-20 mx-4 mt-20"}>
            <p className="text-white font-slick font-light text-base max-w-[55vh]">
              {t("undertitle")}
            </p>
            <div className={"flex flex-row py-5 gap-4"}>
              <Link
                href={"/charters"}
                type={"button"}
                className="glass-button glass-button-light"
              >
                {t("CTA")}
              </Link>
              <Link
                href={"/sales"}
                type={"button"}
                className="glass-button glass-button-light"
              >
                {t("CTA2")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
