import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import sales from "@/public/imagery/optimized/index/services/sales.webp";
import charter from "@/public/imagery/optimized/index/services/charter.webp";
import management from "@/public/imagery/optimized/index/services/management.webp";
import construction from "@/public/imagery/optimized/index/services/construction.webp";

const Services = () => {
  const t = useTranslations("index.services");

  return (
    <div className="bg-rock-100 w-full h-full">
      <div className="flex flex-col items-start mx-auto md:px-10 px-3 py-16">
        <h2 className="text-5xl font-slick text-left mb-8">{t("title")}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2">
          <div className="flex flex-col ">
            <Image
              src={sales}
              alt="Sales"
              className="mb-4 shadow-lg lg:h-[65vh] h-[35vh]"
            />
            <h3 className="md:text-xl text-lg font-classic text-left">
              {t("sales")}
            </h3>
            <p className={"font-slick md:text-2xl text-base"}>{t("sales-p")}</p>
          </div>

          <div className="flex flex-col">
            <Image
              src={charter}
              alt="Charter"
              className="mb-4 shadow-lg lg:h-[65vh] h-[35vh]"
            />
            <h3 className="md:text-xl text-lg font-classic text-left">
              {t("charter")}
            </h3>
            <p className={"font-slick md:text-2xl text-base"}>
              {t("charter-p")}
            </p>
          </div>

          <div className="flex flex-col">
            <Image
              src={management}
              alt="Management"
              className="mb-4 shadow-lg lg:h-[65vh] h-[35vh]"
            />
            <h3 className="md:text-xl text-lg font-classic text-left">
              {t("management")}
            </h3>
            <p className={"font-slick md:text-2xl text-base"}>
              {t("management-p")}
            </p>
          </div>

          <div className="flex flex-col">
            <Image
              src={construction}
              alt="New Construction"
              className="mb-4 shadow-lg lg:h-[65vh] h-[35vh] object-cover"
            />
            <h3 className="md:text-xl text-lg font-classic">
              {t("construction")}
            </h3>
            <p className={"font-slick md:text-2xl text-base"}>
              {t("construction-p")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
