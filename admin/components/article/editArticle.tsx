"use client"
import {useEffect, useState} from "react";
import {getArticle} from "@/actions/article";
import IArticle from "@/types/article";
import {Button} from "@nextui-org/react";
import EditArticleModal from "@/components/article/editArticleModal";

const EditArticle = () => {
    const [articles, setArticles] = useState<IArticle[]>([])
    const [selectedArticle, setSelectedArticle] = useState<IArticle | null>(null);
    useEffect(() => {
        getArticle().then((res) => {
            setArticles(res);
            console.log(res)
        }).catch((e) => {
            console.error(e);
        })
    }, []);

    if (selectedArticle) return <EditArticleModal article={selectedArticle} setSelectedArticle={setSelectedArticle} />

    return (
        <div className={"w-[60%] mx-auto flex flex-col items-center"}>
            <h2>Edit Article</h2>
            {articles.length > 0 && articles.map((article, index) => {
                return <Button onClick={()=>setSelectedArticle(article)} variant={"light"}  key={index} className={" w-[40%] hover:cursor-pointer  flex mx-2 my-1 bg-black/10 rounded-xl"}>
                    {article.en.headline}
                </Button>
            })}
        </div>
    );
}
export default EditArticle;