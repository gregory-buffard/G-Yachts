"use client";

import { useTranslations } from "next-intl";
import { useViewContext } from "@/context/view";
import React from "react";

const Lifestyle = () => {
  const t = useTranslations("company.bottom"),
    { openView } = useViewContext();
  return (
    <section
      className={
        "h-[56dvh] w-full relative overflow-hidden items-center flex flex-col justify-center text-center text-white"
      }
    >
      <video
        src="/imagery/optimized/company/bottom.mp4"
        autoPlay
        loop
        muted
        preload={"none"}
        className="w-full absolute -z-10 h-full object-cover object-top"
        playsInline
      />
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
      <button
        className={"glass-button glass-button-light mt-4"}
        onClick={() => openView("contact")}
      >
        {t("CTA")}
      </button>
    </section>
  );
};

export default Lifestyle;
