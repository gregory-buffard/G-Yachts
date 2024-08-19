import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import finance from "@/public/pictures/management/finance.webp";
import support from "@/public/pictures/management/support.webp";
import administrative from "@/public/pictures/management/administrative.webp";
import management from "@/public/pictures/management/management.webp";

const ServiceList = () => {
  const t = useTranslations("management.servicesList");
  return (
    <section className={"bg-rock-100 w-full h-full"}>
      <div className="grid lg:grid-cols-4 md:gap-6 gap-2 p-[10vw] md:py-[2vw]">
        <div className="flex flex-col pb-[5vw]">
          <Image
            src={finance}
            alt="Sales"
            className="shadow-lg lg:h-[50vh] h-[50vh] object-cover"
          />
          <h3 className="text-xl font-light font-slick text-left my-4">
            {t("finance.title")}
          </h3>
          <p className={"font-classic font-light text-sm text-justify"}>
            {t("finance.description")}
          </p>
        </div>

        <div className="flex flex-col pb-[5vw]">
          <Image
            src={support}
            alt="Charter"
            className="shadow-lg lg:h-[50vh] h-[50vh] object-cover"
          />
          <h3 className="text-xl font-light font-slick text-left my-4">
            {t("support.title")}
          </h3>
          <p className={"font-classic font-light text-sm text-justify"}>
            {t("support.description")}
          </p>
        </div>

        <div className="flex flex-col pb-[5vw]">
          <Image
            src={administrative}
            alt="Management"
            className="shadow-lg lg:h-[50vh] h-[50vh] object-cover"
          />
          <h3 className="text-xl font-light font-slick text-left my-4">
            {t("administrative.title")}
          </h3>
          <p className={"font-classic text-sm text-justify"}>
            {t("administrative.description")}
          </p>
        </div>

        <div className="flex flex-col">
          <Image
            src={management}
            alt="New Construction"
            className="shadow-lg lg:h-[50vh] h-[50vh] object-cover"
          />
          <h3 className="text-xl font-light font-slick text-left my-4">
            {t("crew.title")}
          </h3>
          <p className={"font-classic font-light text-sm text-justify"}>
            {t("crew.description")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceList;
