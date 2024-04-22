import Bar from "@/components/bar";
import { Hero } from "@/components";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("LearnSection");
  return (
    <main className="w-screen flex flex-col justify-start items-center">
      <Bar />
      <Hero />
      <section className="bg-white containerize py-44 flex flex-col justify-center items-start containerize">
        <h1 className={"text-4xl"}>{t("title")}</h1>
        <button type={"button"} className="glass-button">
          {t("CTA")}
        </button>
      </section>
      <section className="bg-yellow-300 w-full py-96"></section>
    </main>
  );
};

export default Home;
