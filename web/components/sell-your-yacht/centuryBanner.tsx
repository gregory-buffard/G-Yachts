import { useTranslations } from "next-intl";
import Image from "next/image";
import world from "@/public/pictures/sell-your-yacht/world.webp";

export default function QualityOverQuantity() {
  const t = useTranslations("sell-your-yacht.expertise");

  return (
    <div className="w-full flex flex-col lg:flex-row h-full mt-20">
      <div className="lg:w-1/2 flex flex-col justify-center">
        <Image
          src={world}
          alt={"Globe with a logo"}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:w-1/2 flex flex-col justify-center bg-navy py-48 px-16 order-first lg:order-last">
        <h1 className="text-4xl lg:text-8xl font-bold text-white z-[2] drop-shadow-md text-right">
          {t("title")}
        </h1>
        <p className="text-white text-sm lg:text-lg leading-8 mt-12 text-right w-full">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
