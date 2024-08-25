"use client";

import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("destinations");

  return (
    <section
      className={
        "w-full h-[36dvh] md:h-screen bg-cover bg-center text-white uppercase"
      }
      style={{
        backgroundImage: `url(/pictures/destinations.webp)`,
      }}
    >
      <div
        className={
          "w-full h-full opacity-sheet px-[4vw] md:px-[8vw] py-[2vh] md:py-[6vh] flex flex-col justify-end items-start"
        }
      >
        <h4>{t("heroSubtitle")}</h4>
        <h1 className={"normal-case lg:text-6xl md:text-5xl text-2xl"}>
          {t.rich("heroTitle", {
            classic: (chunk) => (
              <span className={"font-classic uppercase"}>{chunk}</span>
            ),
          })}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
