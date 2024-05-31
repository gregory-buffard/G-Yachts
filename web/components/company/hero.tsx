import React from "react";
import { useTranslations } from "next-intl";
import herox from "@/public/imagery/optimized/index/herox.webp";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations("company.hero");
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="grid grid-cols-2">
        <div className={"bg-rock-100 pt-[23vw] pl-[10vw]"}>
            <div className={"items-end"}>
                <h4 className={"text-black text-xl"}>
                    {t("subtitle")}
                </h4>
                <h1 className={"text-7xl"}>
                    {t.rich("title", {
                        classic: (chunks) => (
                            <span className={"font-classic font-normal uppercase"}>
                <br className={"hidden lg:block"} />
                                {chunks}
              </span>
                        ),
                    })}
                </h1>
                <h3 className={"w-[30vw] py-[2vw] font-classic font-light text-xl"}>
                    {t("description")}
                </h3>
            </div>
        </div>
        <Image src={herox} alt={"Yacht"} className={"object-cover h-screen"}/>
      </div>
    </div>
    );
}

export default Hero;