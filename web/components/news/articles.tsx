"use client";

import { IArticle } from "@/types/article";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";

const Articles = ({ articles, locale }: { articles: IArticle[]; locale: string }) => {
    const selectedCategory = useSearchParams().get("category");
    const t = useTranslations("news");
    // Get all years from articles
    const years = articles.map((article) => new Date(article.date).getFullYear());
    // Get unique years
    const uniqueYears = years.filter((year, index) => years.indexOf(year) === index);
    // State to store the filtered articles
    const [filteredArticles, setFilteredArticles] = useState<IArticle[]>(articles);

    // State to store the opened year
    const [openedYear, setOpenedYear] = useState(uniqueYears[0]);
    // State to store the selected month
    const [selectedMonth, setSelectedMonth] = useState<number | undefined>();

    // Limit the number of articles to show
    const articleLimitConst = 4;
    const [articlesLimit, setArticlesLimit] = useState(articleLimitConst);

    // Reset the selected month when the year changes
    useEffect(() => {
        setSelectedMonth(undefined);
    }, [openedYear]);

    // Filter the articles based on the selected month and year
    useEffect(() => {
        // Show only that are older than the selected month and year
        const selectedDate = new Date(openedYear, selectedMonth || 11);
        const newFilteredArticles = articles.filter(
            (article) => new Date(article.date) <= selectedDate
        );
        setFilteredArticles(newFilteredArticles);
    }, [selectedMonth, openedYear]);

    // Filter the articles based on the selected category
    useEffect(() => {
        if (selectedCategory) {
            const newFilteredArticles = articles.filter((article) => {
                return locale === "en"
                    ? article.en.category === selectedCategory
                    : article.fr.category === selectedCategory;
            });
            setFilteredArticles(newFilteredArticles);
        } else {
            setFilteredArticles(articles);
        }
        setOpenedYear(uniqueYears[0]);
        setSelectedMonth(undefined);
    }, [selectedCategory]);

    return (
        <div className="my-28 flex flex-col-reverse lg:flex-row">
            <div className="flex flex-col w-full lg:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredArticles.length === 0 && (
                        <h2 className="mt-16 lg:mt-0">{t("noArticles")}</h2>
                    )}
                    {filteredArticles
                        .slice(filteredArticles.length == 1 ? 0 : 1, articlesLimit + 1)
                        .map((article, index) => (
                            <ArticleCard key={index} article={article} locale={locale} />
                        ))}
                </div>
                {filteredArticles.length > articlesLimit + 1 && (
                    <span
                        onClick={() => setArticlesLimit(articlesLimit + articleLimitConst)}
                        className="glass-button mx-auto mt-16 cursor-pointer h-min my-auto">
                        {t("loadMore")}
                    </span>
                )}
            </div>
            <div className="w-full lg:w-1/4 lg:ml-10 lg:pl-10 lg:border-l-2 border-gray-700 flex flex-row flex-wrap lg:flex-col">
                {uniqueYears.map((year, index) => (
                    <div className="flex flex-col my-4 mr-4" key={index}>
                        <div
                            className="flex flex-row w-full justify-between cursor-pointer"
                            onClick={() => setOpenedYear(year)}>
                            <h4
                                className={clsx("text-2xl", {
                                    "font-bold w-full": openedYear === year,
                                })}>
                                {year}
                            </h4>
                            <img
                                src="/icons/arrow.svg"
                                alt="arrow"
                                className={clsx(
                                    "h-6 w-6 transition-transform duration-200 hidden lg:block",
                                    {
                                        "transform rotate-90": openedYear !== year,
                                        "transform rotate-0": openedYear === year,
                                    }
                                )}
                            />
                        </div>
                        {openedYear === year && (
                            <div className="flex flex-row lg:flex-col flex-wrap gap-2 mt-2">
                                {Array(12)
                                    .fill(0)
                                    .map((_, i) => (
                                        <span
                                            onClick={() => setSelectedMonth(i)}
                                            className={clsx("cursor-pointer", {
                                                "font-bold":
                                                    selectedMonth === i && openedYear === year,
                                            })}
                                            key={i}>
                                            {new Date(year, i).toLocaleString(locale, {
                                                month: "long",
                                            })}
                                        </span>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ArticleCard = ({ article, locale }: { article: IArticle; locale: string }) => {
    const articleData = locale === "en" ? article.en : article.fr;
    const t = useTranslations("news");
    return (
        <Link
            href={{
                pathname: "/news/[id]",
                params: { id: article._id },
            }}
            className="flex flex-col gap-4">
            <img src={article.heroImage} alt={article.en.headline} />
            <h4 className="text-xl">{articleData.category}</h4>
            <h3 className="font-slick font-light uppercase text-2xl">{articleData.headline}</h3>
            <span className="text-xl text-gray-400 uppercase underline">{t("readArticle")}</span>
        </Link>
    );
};

export default Articles;
