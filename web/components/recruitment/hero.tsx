import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("recruitment.hero");
  return (
    <section
      className={
        "w-full px-[4vw] md:px-[8vw] h-[36dvh] md:h-screen bg-cover bg-center flex flex-col justify-end items-start text-white py-[2vh] md:py-[6vh]"
      }
      style={{
        backgroundImage: `url(../images/recruitment/hero.webp)`,
      }}
    >
      <h4>{t("subtitle")}</h4>
      <h1 className={"font-regular lg:text-6xl md:text-5xl text-xl"}>
        {t.rich("title", {
          classic: (chunk) => <span className={"classic"}>{chunk}</span>,
        })}
      </h1>
    </section>
  );
};

export default Hero;
