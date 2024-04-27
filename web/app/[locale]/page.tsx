import Bar from "@/components/nav/bar";
import Hero from "@/components/index/hero";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import React from "react";

const Services = dynamic(() => import("@/components/index/services"));
const WorkingTogether = dynamic(() => import("@/components/index/working"));
const Featured = dynamic(() => import("@/components/index/featured/section"));
const Memories = dynamic(() => import("@/components/index/memories"));

const Home = () => {
  const t = useTranslations("index");
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <Hero />
      <section className="bg-white py-28 flex flex-col leading-relaxed justify-center items-start containerize">
        <div className="flex flex-col font-slick">
          <h1 className={"md:text-4xl text-2xl leading-normal"}>
            {t.rich("learn.title", { br: () => <br /> })}
          </h1>
        </div>
        <button type={"button"} className="glass-button glass-button-dark mt-8">
          {t("learn.CTA")}
        </button>
      </section>
      <Services />
      <WorkingTogether />
      <Featured />
      <Memories />
    </main>
  );
};

export default Home;
