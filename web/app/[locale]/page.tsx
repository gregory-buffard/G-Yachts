import Bar from "@/components/bar";
import { Hero } from '@/components';
import {useTranslations} from 'next-intl';

const Home = () => {
    const t = useTranslations("LearnSection");
  return (
      <main className="overflow-x-hidden">
          <Bar/>
          <Hero/>
              <section className="bg-white w-full py-44">
                  <div className="flex flex-col items-center justify-center">
                      <h2>{t("title")}</h2>
                      <button type={"button"} className="glass-button text-black border-black/25">{t("CTA")}</button>
                  </div>
              </section>
          <section className="bg-yellow-300 w-full py-96"></section>
      </main>
  );
};

export default Home;
