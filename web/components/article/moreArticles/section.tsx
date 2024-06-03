import { fetchArticles } from "@/actions/acrticles";
import Section from "@/components/article/moreArticles/components";
import { IArticle } from "@/types/article";

const ChartersInDestination = async ({ currentArticle }: { currentArticle: string }) => {
    var articles: IArticle[] = await fetchArticles({ limit: 6 });
    articles = articles.filter((article) => article._id !== currentArticle);

    return <Section carouselData={articles} />;
};

export default ChartersInDestination;
