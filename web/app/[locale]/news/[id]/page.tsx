import dynamic from "next/dynamic";
import Bar from "@/components/nav/bar";
import Hero from "@/components/article/hero";
import { ArticleProvider } from "@/context/article";
import { fetchArticle, fetchArticles } from "@/actions/articles";
import Detail from "@/components/article/detail";
import { IArticle } from "@/types/article";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";
import { fetchMetadata } from "@/actions/actions";

const View = dynamic(() => import("@/components/view")),
  Articles = dynamic(() => import("@/components/article/articles")),
  Newsletter = dynamic(() => import("@/components/newsletter")),
  Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const id = params.id,
    locale = (await getLocale()) as "en" | "fr";

  return await fetchMetadata({ id, type: "article", locale });
};

const Destinations = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const locale = (await getLocale()) as "en" | "fr",
    article = await fetchArticle(params.id, locale);

  return (
    <ArticleProvider article={article} locale={locale}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <main className="flex flex-col w-full lg:px-[12vw] px-[4vw]">
          <Detail />
        </main>
        <Articles
          data={(await fetchArticles(locale)).filter(
            (listedArticle) => listedArticle.id !== article.id,
          )}
        />
        <Newsletter />
        <Footer />
      </main>
    </ArticleProvider>
  );
};

export default Destinations;
