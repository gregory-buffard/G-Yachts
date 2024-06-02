import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import herox from "@/public/imagery/optimized/index/herox.webp";

const Accordion = () => {
  const t = useTranslations("company.philosophy");

  return (
    <section className={"w-full h-full bg-rock-100 overflow-hidden"}>
      <div className={"grid md:grid-cols-2 px-[10vw]"}>
        <div className={"mt-24"}>
          <h4 className={"font-classic font-normal"}>{t("header.subtitle")}</h4>
          <h1 className={""}>
            {t.rich("header.title", {
              classic: (chunks) => (
                <span className={"font-classic font-normal uppercase"}>
                  {chunks}
                </span>
              ),
            })}
          </h1>
        </div>
        <div className="w-full mt-24">
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
              <div className="pb-4 text-base font-classic text-secondary-500 text-justify">
                {t("dropdown.services.description")}
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
              <div className="pb-4 font-classic text-base text-secondary-500 text-justify">
                {t("dropdown.presence.description")}
              </div>
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
              <div className="pb-4 text-base font-classic text-secondary-500 text-justify">
                {t("dropdown.partnership.description")}
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
          <p className={"py-[2vw]"}>{t("header.description")}</p>
        </div>
        <Image src={herox} alt={"Yacht in the sea"} className={""} />
      </div>
    </section>
  );
};

export default Accordion;
