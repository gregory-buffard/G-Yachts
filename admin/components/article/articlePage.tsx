"use client"
import CreateNew from "@/components/article/createNew";
import {useState} from "react";
import {Button} from "@nextui-org/react";
import EditArticle from "@/components/article/editArticle";

const ArticlePage = () => {
    const [activeTab, setActiveTab] = useState<string| undefined>();
    return (
        <div>
            {!activeTab && <div className={"flex gap-4 w-full h-[90vh] gap-2 flex-col items-center justify-center"}>
                <h1 className={""}>Article Page</h1>

                <Button className={"w-[200px] h-[70px]"} variant={"bordered"}
                        onClick={() => setActiveTab("create")}>Create</Button>
                <Button className={"w-[200px] h-[70px]"} variant={"bordered"}
                        onClick={() => setActiveTab("edit")}>Edit</Button>
            </div>}
            {activeTab === "create" && <CreateNew/>}
            {activeTab === "edit" && <EditArticle/>}
        </div>
    );
}

export default ArticlePage;