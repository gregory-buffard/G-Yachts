"use client";

import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("destinations");

  return (
    <section
      className={
        "w-full px-[4vw] md:px-[8vw] h-[36dvh] md:h-screen bg-cover bg-center flex flex-col justify-end items-start text-white uppercase py-[2vh] md:py-[6vh]"
      }
      style={{
        backgroundImage: `url(/imagery/original/IMG_8260.JPG)`,
      }}
    >
      <h4>{t("heroSubtitle")}</h4>
      <h1 className={"normal-case"}>
        {t.rich("heroTitle", {
          classic: (chunk) => (
            <span className={"font-classic uppercase"}>{chunk}</span>
          ),
        })}
      </h1>
    </section>
  );
};

export default Hero;
