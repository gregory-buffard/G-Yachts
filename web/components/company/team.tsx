import React from "react";
import { useTranslations } from "next-intl";
import Brokerino from "@/components/company/brokerino";
import IBrokerino from "@/types/brokerino";

const Team = ({ brokerinos }: { brokerinos: IBrokerino[] }) => {
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
      <div className={"grid md:grid-cols-4"}>
        {brokerinos.map((brokerino, i) => (
          <Brokerino key={i} brokerino={brokerino} />
        ))}
      </div>
    </section>
  );
};

export default Team;
