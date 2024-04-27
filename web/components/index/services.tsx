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
    <div className="bg-rock-100 bg-cover h-full">
      <div className="container flex flex-col items-start mx-auto px-0 py-16">
        <h2 className="text-4xl font-slick text-left mb-8">{t("title")}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col ">
            <Image src={sales} alt="Sales" className="mb-4 shadow-lg" />
            <h3 className="text-xl font-classic text-left">{t("sales")}</h3>
            <p className={"font-slick text-2xl"}>{t("sales-p")}</p>
          </div>

          <div className="flex flex-col">
            <Image src={charter} alt="Charter" className="mb-4 shadow-lg" />
            <h3 className="text-xl font-classic text-left">{t("charter")}</h3>
            <p className={"font-slick text-2xl"}>{t("charter-p")}</p>
          </div>

          <div className="flex flex-col">
            <Image
              src={management}
              alt="Management"
              className="mb-4 shadow-lg w-full h-full"
            />
            <h3 className="text-xl font-classic text-left">
              {t("management")}
            </h3>
            <p className={"font-slick text-2xl"}>{t("management-p")}</p>
          </div>

          <div className="flex flex-col">
            <Image
              src={construction}
              alt="New Construction"
              className="mb-4 shadow-lg w-full h-full object-cover"
            />
            <h3 className="text-xl font-classic">{t("construction")}</h3>
            <p className={"font-slick text-2xl"}>{t("construction-p")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
