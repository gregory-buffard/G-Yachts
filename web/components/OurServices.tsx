import React from "react";
import { useTranslations } from "next-intl";

const OurServices = () => {
  const t = useTranslations("ourServices");
  return (
    <div className="bg-rock-100 bg-cover h-full">
      <div className="container flex flex-col items-start mx-auto px-0 py-16">
        <h2 className="text-4xl font-slick text-left mb-8">{t("title")}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <img
              src={"/imagery/penne.jpg"}
              alt="Sales"
              className="mb-4 shadow-lg w-full h-full object-center"
            />
            <h3 className="text-xl font-classic text-left relative">
              {t("sales")}
            </h3>
            <p className={"font-slick text-2xl"}>{t("sales-p")}</p>
          </div>

          <div className="flex flex-col">
            <img
              src="/imagery/IMG_8259.JPG"
              alt="Charter"
              className="mb-4 shadow-lg w-full h-full"
            />
            <h3 className="text-xl font-classic text-left">{t("charter")}</h3>
            <p className={"font-slick text-2xl"}>{t("charter-p")}</p>
          </div>

          <div className="flex flex-col">
            <img
              src="/imagery/5.png"
              alt="Management"
              className="mb-4 shadow-lg w-full h-full"
            />
            <h3 className="text-xl font-classic text-left">
              {t("management")}
            </h3>
            <p className={"font-slick text-2xl"}>{t("management-p")}</p>
          </div>

          <div className="flex flex-col">
            <img
              src="/imagery/NEW CONSTRUCTION.jpeg"
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

export default OurServices;
