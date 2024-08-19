import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("partners.hero");
  return (
    <section
      className={
        "w-full px-[4vw] md:px-[8vw] h-[36dvh] md:h-screen bg-cover bg-center flex flex-col justify-end items-start text-white py-[2vh] md:py-[6vh]"
      }
      style={{
        backgroundImage: `url(/pictures/partners/hero.webp)`,
      }}
    >
      <h4>{t("subtitle")}</h4>
      <h1 className={"lg:text-6xl md:text-5xl text-xl font-regular"}>
        {t.rich("title", {
          classic: (chunk) => (
            <span className={"classic drop-shadow-lg"}>{chunk}</span>
          ),
        })}
      </h1>
    </section>
  );
};

export default Hero;
