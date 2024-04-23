import Bar from "@/components/nav/bar";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/index/hero"));
const Featured = dynamic(() => import("@/components/index/featured"));

const Home = () => {
  const t = useTranslations("index");

  return (
    <main className="w-screen flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <Hero />
      <section className="bg-white py-44 flex flex-col justify-center items-start containerize">
        <h1 className={"text-4xl"}>{t("learn.title")}</h1>
        <button type={"button"} className="glass-button glass-button-dark">
          {t("learn.CTA")}
        </button>
      </section>
      <section className="bg-yellow-300 w-full py-96"></section>
      <Featured />
    </main>
  );
};

export default Home;
