"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import monaco from "@/public/imagery/optimized/company/monaco.webp";

const Accordion = () => {
  const t = useTranslations("company.philosophy");

  useEffect(() => {
    const detailsElements = document.querySelectorAll("details");
    detailsElements.forEach((el) => {
      el.addEventListener("click", () => {
        detailsElements.forEach((detail) => {
          if (detail !== el) {
            detail.removeAttribute("open");
          }
        });
      });
    });
  }, []);

  return (
    <section className={"w-full h-full bg-rock-100 overflow-hidden"}>
      <div className={"grid md:grid-cols-2 px-[10vw]"}>
        <div className={"mt-24"}>
          <h4 className={"font-classic font-normal"}>{t("header.subtitle")}</h4>
          <h1 className={""}>
            {t.rich("header.title", {
              br: () => <br />,
              classic: (chunks) => (
                <span className={"font-classic font-normal uppercase"}>
                  {chunks}
                </span>
              ),
            })}
          </h1>
        </div>
        <div className="w-full mt-20">
          <div className="divide-y divide-gray-300">
            <details className="group" open>
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-3xl font-classic text-secondary-900 group-open:text-primary-500">
                {t("dropdown.services.title")}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="block w-10 group-open:hidden"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="hidden w-10 group-open:block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </div>
              </summary>
              <div className="pb-4  font-classic text-secondary-500 text-justify pr-12">
                <p
                  className={
                    "mb-5 text-justify font-classic text-secondary-500"
                  }
                >
                  {t("dropdown.services.description")}
                </p>
                <p className="text-justify  font-classic text-secondary-500">
                  {t("dropdown.services.description2")}
                </p>
                <p
                  className={
                    "mt-5 text-justify font-classic text-secondary-500"
                  }
                >
                  {t("dropdown.services.description3")}
                </p>
              </div>
            </details>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-3xl font-classic text-secondary-900 group-open:text-primary-500">
                {t("dropdown.presence.title")}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="block w-10 group-open:hidden"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="hidden w-10 group-open:block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </div>
              </summary>
              <p className="pb-4 font-classic text-secondary-500 text-justify pr-12">
                {t("dropdown.presence.description")}
              </p>
            </details>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-3xl font-classic text-secondary-900 group-open:text-primary-500">
                {t("dropdown.partnership.title")}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="block w-10 group-open:hidden"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="hidden w-10 group-open:block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </div>
              </summary>
              <div className="pb-4 font-classic text-secondary-500 text-justify pr-12">
                <p className=" mb-5 text-justify font-classic text-secondary-500">
                  {t("dropdown.partnership.description")}
                </p>
                <p className="text-justify font-classic text-secondary-500">
                  {t("dropdown.partnership.description2")}
                </p>
              </div>
            </details>
            <div />
          </div>
        </div>
      </div>
      <div className={"grid md:grid-cols-2 items-center p-[10vw]"}>
        <div className={""}>
          <h1 className={""}>
            {t.rich("header.undertitle", {
              classic: (chunks) => (
                <span className={"font-classic font-normal uppercase"}>
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <div className={"text-justify md:pr-36"}>
            <p className={"py-[2vw]"}>{t("header.description")}</p>
            <p>{t("header.description2")}</p>
          </div>
        </div>
        <Image src={monaco} alt={"Yacht show in Monaco"} className={""} />
      </div>
    </section>
  );
};

export default Accordion;
