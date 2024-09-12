import React from "react";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("sell-your-yacht.hero");
  return (
    <section
      className={
        "w-full h-screen place-items-center justify-center  bg-cover bg-bottom flex radial-gradient"
      }
      style={{
        backgroundImage: `url(/pictures/sell-your-yacht/hero.webp)`,
      }}
    >
      <h1 className={"font-medium text-9xl text-white"}>{t("title")}</h1>
    </section>
  );
};

export default Hero;
