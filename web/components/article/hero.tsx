"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useArticle } from "@/context/article";

const Hero = () => {
    const { article, localeArticle } = useArticle(),
        t = useTranslations("article"),
        params = useParams();

    return (
        <section
            className={
                "w-full px-[4vw] md:px-[8vw] h-[36dvh] md:h-screen bg-cover bg-center flex flex-col justify-end items-start text-white uppercase py-[2vh] md:py-[6vh]"
            }
            style={{
                backgroundImage: `url(${article.heroImage})`,
            }}>
            <h4>{localeArticle.category}</h4>
            <h1 className={"font-classic normal-case"}>{localeArticle.headline}</h1>
        </section>
    );
};

export default Hero;
