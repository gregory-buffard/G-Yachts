import Hero from "@/components/news/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchArticles } from "@/actions/articles";
import { IArticle } from "@/types/article";
import {getLocale, getTranslations} from "next-intl/server";

const Articles = dynamic(() => import("@/components/news/articles"));
const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
                                           params: { locale },
                                       }: {
    params: { locale: "en" | "fr" };
}) => {
    const t = await getTranslations({ locale, namespace: "news.metadata" });
    return {
        title: t("title"),
        description: t("description"),
        keywords: t("keywords"),
        author: "G-Yachts",
        openGraph: {
            title: t("title"),
            siteName: "G-Yachts",
            url:
                locale === "en"
                    ? `https://g-yachts.com/${locale}/news`
                    : `https://g-yachts.com/${locale}/actualites`,
            description: t("description"),
            type: "website",
            locale: locale === "en" ? "en_US" : "fr_FR",
            images: [
                {
                    url: encodeURI("https://g-yachts.com/images/openGraph.png"),
                    width: 1200,
                    height: 630,
                    alt: "G-Yachts logo",
                },
            ],
        },
    };
};

const News = async ({
  searchParams,
}: {
  searchParams: {
    category?: string;
  };
}) => {
  const locale = (await getLocale()) as "en" | "fr";

  const selectedCategory = searchParams.category;
  const articles: IArticle[] = await fetchArticles(locale);

  var categories = articles.map((article) => article.category.title);
  categories = categories.filter(
    (category, index) => categories.indexOf(category) === index,
  );
  categories.sort();

  var heroArticle = articles[0];

  if (selectedCategory) {
    heroArticle = articles.filter((article) => {
      return article.category.title == selectedCategory;
    })[0];
  }

  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={-1} />
      <View />
      <Hero article={heroArticle} categories={categories} />
      <div className="flex flex-col w-full lg:w-5/6 px-10">
        <Articles articles={articles} locale={locale} />
      </div>
      <Newsletter />
      <Footer />
    </main>
  );
};

export default News;
