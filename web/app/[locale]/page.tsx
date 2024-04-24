import Bar from "@/components/bar";
import { Hero } from "@/components";
import { OurServices } from "@/components";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("LearnSection");
  return (
    <main className="w-full flex flex-col justify-start items-center  overflow-hidden">
      <Bar />
      <Hero />
      <section className="bg-white py-32 flex flex-col leading-relaxed justify-center items-start containerize">
        <div className="flex flex-col font-slick">
          <h1 className={"text-4xl leading-normal"}>{t("title")}</h1>
          <h1 className={"text-4xl leading-normal"}>{t("title1")}</h1>
          <h1 className={"text-4xl leading-normal"}>{t("title2")}</h1>
        </div>
        <button
          type={"button"}
          className="glass-button text-black border-black/25"
        >
          {t("CTA")}
        </button>
      </section>
      <OurServices />
    </main>
  );
};

export default Home;
