import { useTranslations } from "next-intl";
import Image from "next/image";
import yacht from "@/public/pictures/sell-your-yacht/yacht.webp";

export default function QualityOverQuantity() {
  const t = useTranslations("sell-your-yacht.quality");

  return (
    <div className="w-full flex flex-col lg:flex-row h-full lg:h-screen">
      <div className="lg:w-1/2 flex flex-col justify-center bg-navy py-48 px-16 lg:relative">
        <h1 className="text-4xl lg:text-8xl font-bold text-white z-[2] overflow-x-visible w-[70vw] drop-shadow-lg">
          {t("title")}
        </h1>
        <p className="text-white text-sm lg:text-lg leading-8 mt-12 lg:w-2/3">
          {t("description")}
        </p>
        <Image
          alt="Yacht"
          src={yacht}
          className="lg:absolute pt-20 lg:pt-0 lg:left-0 lg:top-50 lg:translate-x-[43vw] lg:z-[1] lg:w-[60vw] lg:h-auto"
        />
      </div>
    </div>
  );
}
