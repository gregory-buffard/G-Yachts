import { useTranslations } from "next-intl";

export default function QualityOverQuantity() {
  const t = useTranslations("sell-your-yacht.expertise");

  return (
    <div className="w-full flex flex-row h-screen mt-20">
      <div className="w-1/2 flex flex-col justify-center py-48 px-16">
        <img
          src="/pictures/sell-your-yacht/world.png"
          className="object-cover w-full h-auto"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center bg-navy py-48 px-16">
        <h1 className="text-8xl font-bold text-white z-[2]  drop-shadow-md text-right">
          {t("title")}
        </h1>
        <p className="text-white text-lg leading-8 mt-12 text-right w-full">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
