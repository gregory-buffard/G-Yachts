import React from "react";
import { useTranslations } from "next-intl";
import Brokerino from "@/components/sell-your-yacht/brokerino";
import IBrokers from "@/types/brokers";

const Team = ({ brokerinos }: { brokerinos: IBrokers[] }) => {
    const t = useTranslations("sell-your-yacht.team");

    return (
        <section className={"w-full overflow-hidden place-items-center  flex flex-col"}>
            <h1 className={"py-[10vh] md:text-7xl text-6xl font-medium text-center"}>
                {t.rich("title", { br: () => <br /> })}
            </h1>
            <div
                className={
                    "md:grid grid-cols-2 gap-[3vw] justify-center place-items-center w-full h-full px-[10vw]"
                }
            >
                {brokerinos.map((brokerino, i) => (
                    <Brokerino key={i} brokerino={brokerino} />
                ))}
            </div>
        </section>
    );
};

export default Team;
