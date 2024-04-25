import Bar from "@/components/nav/bar";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/index/hero"));
const Services = dynamic(() => import("@/components/index/services"));
const Featured = dynamic(() => import("@/components/index/featured/section"));

const Home = () => {
  const t = useTranslations("index");
  return (
    <main className="w-screen flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <Hero />
      <section className="bg-white py-32 flex flex-col leading-relaxed justify-center items-start containerize">
        <div className="flex flex-col font-slick">
          <h1 className={"text-4xl leading-normal"}>{t("learn.title")}</h1>
          <h1 className={"text-4xl leading-normal"}>{t("learn.title1")}</h1>
          <h1 className={"text-4xl leading-normal"}>{t("learn.title2")}</h1>
        </div>
        <button type={"button"} className="glass-button glass-button-dark">
          {t("learn.CTA")}
        </button>
      </section>
      <Services />
      <Featured />
    </main>
  );
};

export default Home;
