"use client"
import {useEffect, useState} from "react";
import {getArticle} from "@/actions/article";
import IArticle from "@/types/article";

const EditArticle = () => {
    const [articles, setArticles] = useState<IArticle[]>([])
    useEffect(() => {
        getArticle().then((res) => {
            setArticles(res);
        }).catch((e) => {
            console.error(e);
        })
    }, []);

    return (
        <div className={"w-[60%] mx-auto flex flex-col items-center"}>
            <h2>Edit Article</h2>
            {articles.length > 0 && articles.map((article, index) => {
                return <div onClick={""} key={index} className={"w-[40%] h-fit flex mx-2 my-1 bg-black/10 rounded-xl"}>
                    <h2 className={"mx-auto"}>{article.en.headline}</h2>

                </div>
            })}
        </div>
    );
}
export default EditArticle;