import { useTranslations } from "next-intl";
import React from "react";

const Bottom = () => {
  const t = useTranslations("management.bottom");
  return (
    <section className={"w-full h-[36dvh] md:h-[46dvh] relative overflow-hidden"}>
        <div className={"text-center"}>
            <video
                src="/imagery/optimized/management/bottomVideo.mp4"
                autoPlay
                loop
                muted
                preload={"none"}
                className="w-full absolute -z-10 h-full object-cover object-center"
                playsInline
            />
            <h1 className={"text-white py-20"}>{t.rich("title", {
                classic: (chunk) => <span className={"classic"}>{chunk}</span>,
            })}</h1>
        </div>
    </section>
  );
};

export default Bottom;
