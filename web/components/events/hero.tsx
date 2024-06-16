import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("events.hero");

  return (
    <section
      className={
        "w-full h-screen bg-events bg-cover bg-center flex justify-center items-center"
      }
    >
      <div
        className={
          "containerize h-screen bg-black/40 flex flex-col justify-end items-start text-white py-[6vh]"
        }
      >
        <h4>{t("subtitle")}</h4>
        <span className={"hidden md:block"}>
          <h1>
            {t.rich("title", {
              classic: (chunks) => (
                <span className={"uppercase font-classic"}>{chunks}</span>
              ),
            })}
          </h1>
        </span>
        <span className={"md:hidden"}>
          <h2 className={"font-slick font-light"}>
            {t.rich("title", {
              classic: (chunks) => (
                <span className={"uppercase font-classic"}>{chunks}</span>
              ),
            })}
          </h2>
        </span>
      </div>
    </section>
  );
};

export default Hero;
