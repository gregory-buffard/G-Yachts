import { useTranslations } from "next-intl";
import React from "react";

const Bottom = () => {
  const t = useTranslations("management.bottom");
  return (
    <section className={"w-full h-full overflow-hidden"}>
      <div>
        <video
          src="http://51.75.16.185/videos/hero.mp4"
          autoPlay
          loop
          muted
          preload={"none"}
          className="w-full object-cover object-center"
          playsInline
        />
      </div>
    </section>
  );
};

export default Bottom;
