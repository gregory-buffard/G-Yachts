import dynamic from "next/dynamic";
import Bar from "@/components/nav/bar";
import Hero from "@/components/article/hero";
import { ArticleProvider } from "@/context/article";
import { fetchArticle } from "@/actions/articles";
import Detail from "@/components/article/detail";
import { IArticle } from "@/types/article";
import { getLocale } from "next-intl/server";
import MoreArticles from "@/components/article/moreArticles/section";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Destinations = async ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    const locale = await getLocale();
    const article: IArticle = await fetchArticle(params.id, locale);

    return (
        <ArticleProvider article={article} locale={locale}>
            <main className="w-full flex flex-col justify-start items-center">
                <Bar dynamicColor={100} />
                <View />
                <Hero />
                <main className="flex flex-col w-full lg:px-[12vw] px-[4vw]">
                    <Detail />
                </main>
                <MoreArticles currentArticle={params.id} />
                <Newsletter />
                <Footer />
            </main>
        </ArticleProvider>
    );
};

export default Destinations;
