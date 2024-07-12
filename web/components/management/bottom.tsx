"use client";

import { useTranslations } from "next-intl";
import { useViewContext } from "@/context/view";

const Bottom = () => {
  const t = useTranslations("management.bottom"),
    { openView } = useViewContext();
  return (
    <section
      className={"w-full h-[40dvh] md:h-[52dvh] relative overflow-hidden"}
    >
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
        <h1 className={"text-white pt-[10vh] md:pt-[20vh] mb-7 md:mb-10"}>
          {t.rich("title", {
            classic: (chunk) => <span className={"classic"}>{chunk}</span>,
          })}
        </h1>
        <button
          className={"glass-button glass-button-light"}
          onClick={() => openView("contact")}
        >
          {t("CTA")}
        </button>
      </div>
    </section>
  );
};

export default Bottom;
