import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

const Lifestyle = () => {
  const t = useTranslations("company.bottom");
  return (
    <section
      className={
        "h-[56dvh] w-full overflow-hidden items-center flex flex-col justify-center text-center text-white"
      }
      style={{
        backgroundImage: `url(/imagery/original/IMG_8260.JPG)`,
      }}
    >
      <h1 className={"py-[2vw]"}>
        {t.rich("title", {
          classic: (chunks) => (
            <span className={"font-classic font-normal uppercase"}>
              {chunks}
            </span>
          ),
        })}
      </h1>
      <p className={"md:w-[42vw] w-full px-[3vw]"}>{t("description")}</p>
    </section>
  );
};

export default Lifestyle;
