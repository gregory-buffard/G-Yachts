"use client";

import { useArticle } from "@/context/article";
import { useTranslations } from "next-intl";
import { ContentRenderer } from "./content";

const ArticleDetail = () => {
  const t = useTranslations("article");
  const { article, locale } = useArticle();

  return (
    <div className="flex flex-col md:flex-row w-full my-20">
      <div className="w-full md:w-1/5 pr-32 mr-32 md:border-r-2 border-gray-700 flex flex-col items-start">
        <h5 className={"text-xl uppercase"}>{t("category")}</h5>
        <h5 className="font-slick text-xl uppercase mt-2">
          {article.category.title}
        </h5>

        <h5 className="md:mt-16 mt-8 text-xl uppercase">{t("postedOn")}</h5>
        <h5 className="font-slick uppercase mt-2 text-xl">
          {new Date(article.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h5>
      </div>
      <div className="w-full md:w-2/3 h-full text-justify mt-10 pt-10 md:mt-0 md:pt-0 border-t-2 border-gray-700 md:border-none text-lg">
        <ContentRenderer blocks={article.content} />
      </div>
    </div>
  );
};

export default ArticleDetail;
