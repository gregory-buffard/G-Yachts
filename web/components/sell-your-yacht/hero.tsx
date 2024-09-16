import React from "react";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("sell-your-yacht.hero");
  return (
    <section
      className={"w-full h-screen bg-cover bg-bottom"}
      style={{
        backgroundImage: `url(/pictures/sell-your-yacht/hero.webp)`,
      }}
    >
      <div
        className={"w-full h-full place-items-center justify-center flex"}
        style={{
          backgroundSize: "100% 100%",
          backgroundPosition: "0px 0px",
          backgroundImage:
            "radial-gradient(100% 100% at 50% 50%, #0000008A 0%, #FFFFFF00 100%)",
        }}
      >
        <h1 className={"font-medium text-9xl text-white"}>{t("title")}</h1>
      </div>
    </section>
  );
};

export default Hero;
