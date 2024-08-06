"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import monaco from "@/public/imagery/optimized/company/monaco.webp";

const Accordion = () => {
  const t = useTranslations("management.experience");

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
    <section className={"w-full h-full bg-rock-100 overflow-hidden pb-[10vw]"}>
      <div className={"grid md:grid-cols-2 px-[10vw]"}>
        <div className={"mt-12"}>
          <h4 className={"font-classic font-normal"}>{t("subtitle")}</h4>
          <h1 className={""}>
            {t.rich("title", {
              classic: (chunks) => (
                <span className={"font-classic font-normal uppercase"}>
                  {chunks}
                </span>
              ),
            })}
          </h1>
        </div>
        <div className="w-full mt-12">
          <div className="divide-y divide-gray-300">
            <details className="group" open>
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-3xl font-classic text-secondary-900 group-open:text-primary-500">
                {t("professionals.title")}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="block w-7 group-open:hidden"
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
                    className="hidden w-7 group-open:block"
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
                {t("professionals.description")}
              </p>
            </details>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-3xl font-classic text-secondary-900 group-open:text-primary-500">
                {t("needs.title")}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="block w-7 group-open:hidden"
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
                    className="hidden w-7 group-open:block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </div>
              </summary>
              <p className="pb-4 font-classic  text-secondary-500 text-justify pr-12">
                {t("needs.description")}
              </p>
            </details>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-3xl font-classic text-secondary-900 group-open:text-primary-500">
                {t("performance.title")}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="block w-7 group-open:hidden"
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
                    className="hidden w-7 group-open:block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </div>
              </summary>
              <p className="pb-4  font-classic text-secondary-500 text-justify pr-12">
                {t("performance.description")}
              </p>
            </details>
            <div />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
