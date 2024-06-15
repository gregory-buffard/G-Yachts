import { fetchArticles } from "@/actions/articles";
import Section from "@/components/article/moreArticles/components";
import { IArticle } from "@/types/article";
import { getLocale } from "next-intl/server";

const ChartersInDestination = async ({ currentArticle }: { currentArticle: string }) => {
    const locale = await getLocale();
    var articles: IArticle[] = await fetchArticles(locale == "fr" ? "fr" : "en", { limit: 6 });
    articles = articles.filter((article) => article.id !== currentArticle);

    return <Section carouselData={articles} />;
};

export default ChartersInDestination;
