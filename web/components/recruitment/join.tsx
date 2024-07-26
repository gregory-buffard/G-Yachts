import { useTranslations } from "next-intl";
import React from "react";

const Join = () => {
  const t = useTranslations("recruitment.section");
  return (
    <section className={"bg-rock-100 w-full py-10 md:px-[30vw]"}>
      <div className={"flex flex-col text-center"}>
        <h1 className={""}>
          {t.rich("title", {
            classic: (chunk) => <span className={"classic"}>{chunk}</span>,
          })}
        </h1>
        <p className={"pt-5"}>
          {t.rich("subtitle", {
            classic: (chunk) => (
              <a
                href={"mailto:recruitment@g-yachts.com"}
                className={"underline-offset-1 underline font-bold"}
              >
                {chunk}
              </a>
            ),
          })}
        </p>
      </div>
    </section>
  );
};

export default Join;
