"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import IRecruitment from "@/types/recruitment";
import { ContentRenderer } from "@/components/article/content";

const Accordion = ({ data }: { data: IRecruitment }) => {
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
        <div className="w-full mt-20">
          <div className="divide-y divide-gray-300">
            <details className="group" open>
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-3xl font-classic text-secondary-900 group-open:text-primary-500">
                {data.title}
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
              <div className="pb-4 pr-12">
                <ContentRenderer blocks={data.description} />
              </div>
            </details>
            <div />
          </div>
        </div>
      </div>
    </section>
  );
};

const Listing = ({ data }: { data: IRecruitment[] }) => {
  return (
    <section className={"flex justify-between items-start"}>
      <aside className={"flex flex-col justify-center items-start"}>
        <label></label>
        <h1></h1>
      </aside>
      <article className={"flex flex-col justify-start items-center"}>
        {data.map((recruitement, i) => (
          <Accordion key={i} data={recruitement} />
        ))}
      </article>
    </section>
  );
};

export default Listing;
