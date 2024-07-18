import React from "react";
import { useTranslations } from "next-intl";

const Team = () => {
  const t = useTranslations("company");
  return (
    <section className={"w-full h-full bg-rock-100 overflow-hidden"}>
      <h1 className={"px-[10vw]"}>
        {t.rich("team", {
          classic: (chunks) => (
            <span className={"font-classic font-normal uppercase"}>
              {chunks}
            </span>
          ),
        })}
      </h1>
    </section>
  );
};

export default Team;
