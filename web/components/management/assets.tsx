import { useTranslations } from "next-intl";
import Image from "next/image";
import assets from "@/public/imagery/optimized/management/assets.webp";
import React from "react";

const Assets = () => {
  const t = useTranslations("management.assets");
  return (
    <section className={"bg-rock-100 w-full h-full p-[10vw] md:py-[5vw]"}>
      <div className={"grid md:grid-cols-2 items-center"}>
        <Image
          src={assets}
          alt={"Yacht show in Monaco"}
          className={"py-[5vw] md:py-[0vw]"}
        />
        <div className={"order-first md:order-last md:pl-[10vh]"}>
          <h1 className={"pb-[3vw] md:pb-[1vw]"}>
            {t.rich("title", {
              classic: (chunks) => (
                <span className={"font-classic font-normal uppercase"}>
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className={"py-[2vw] md:py[0vw] md:text-xl font-classic font-light text-justify"}>
            {t("paragraph1")}
          </p>
          <p className={"py-[2vw] md:py[0vw] md:text-xl font-classic font-light text-justify"}>
            {t("paragraph2")}
          </p>
          <p className={"py-[2vw] md:py[0vw] md:text-xl font-classic font-light text-justify"}>
            {t("paragraph3")}
          </p>
          <p className={"py-[2vw] md:py[0vw] md:text-xl font-classic font-light text-justify"}>
            {t("paragraph4")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Assets;
