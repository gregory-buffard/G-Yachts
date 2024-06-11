import { useTranslations } from "next-intl";
import React from "react";

const Services = () => {
  const t = useTranslations("management.services");
  return (
    <section className={"bg-rock-100 w-full h-full px-[5vw]"}>
      <div className="text-center py-[4vh] md:px-[35vh]">
        <h4>{t("subtitle")}</h4>
        <h1 className={"py-[2vh]"}>
          {t.rich("title", {
            classic: (chunk) => <span className={"classic"}>{chunk}</span>,
          })}
        </h1>
        <p>{t("paragraph1")}</p>
        <p className={"py-[2vh]"}>{t("paragraph2")}</p>
        <p>{t("paragraph3")}</p>
      </div>
    </section>
  );
};

export default Services;
