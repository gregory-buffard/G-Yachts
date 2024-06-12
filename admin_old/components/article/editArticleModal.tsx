import {Button, Tab, Tabs, Textarea} from "@nextui-org/react";
import {Card, CardBody} from "@nextui-org/card";
import {Input} from "@nextui-org/input";
import {createArticle, updateArticle} from "@/actions/article";
import {useState} from "react";
import IArticle from "@/types/article";
import {useViewContext} from "@/context/view";

const EditArticleModal = (props: {article:IArticle, setSelectedArticle:any}) => {

    const [enArticle, setEnArticle] = useState<any>(props.article.en)
    const [frArticle, setFrArticle] = useState<any>(props.article.fr)
    const {setActive} = useViewContext()
    let tabs = [
        {
            id: "EN",
            label: "EN",
        },
        {
            id: "FR",
            label: "FR",
        }
    ];

    return (
        <div className={" mx-auto"}>
            <h2>Edit Article</h2>
            <Tabs aria-label="Dynamic tabs" items={tabs}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        <Card>
                            <CardBody className={"gap-3"}>
                                <Input
                                    label={"Headline"}
                                    placeholder={"Headline"}
                                    value={item.label === "EN" ? enArticle.headline : frArticle.headline}
                                    onChange={(e) => {
                                        item.label === "EN" ? setEnArticle({
                                            ...enArticle,
                                            headline: e.target.value
                                        }) : setFrArticle({...frArticle, headline: e.target.value})
                                    }}
                                />
                                <Input
                                    label={"Category"}
                                    placeholder={"Category"}
                                    value={item.label === "EN" ? enArticle.category : frArticle.category}
                                    onChange={(e) => {
                                        item.label === "EN" ? setEnArticle({
                                            ...enArticle,
                                            category: e.target.value
                                        }) : setFrArticle({...frArticle, category: e.target.value})
                                    }}
                                />
                                <Textarea
                                    label={"Article"}
                                    placeholder={"Article"}
                                    value={item.label === "EN" ? enArticle.article : frArticle.article}
                                    onChange={(e) => {
                                        item.label === "EN" ? setEnArticle({
                                            ...enArticle,
                                            article: e.target.value
                                        }) : setFrArticle({...frArticle, article: e.target.value})
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </Tab>
                )}
            </Tabs>
            <form
                action={async (formData) => {
                    const data = formData;
                    const reader = new FileReader();
                    reader.readAsDataURL(formData.get("img") as Blob);
                    reader.onload = async () => {
                        await updateArticle({
                            _id: props.article._id,
                            en: {...enArticle},
                            fr: {...frArticle},
                            heroImage: reader.result as string
                        });
                        setActive("dashboard")
                    };
                }}
            >
                <div className={"w-full h-fit flex justify-around items-center flex-row"}>
                    <Button type={"submit"} onClick={() => {
                        console.log(enArticle, frArticle)
                    }}>Update</Button>
                    <input
                        type={"file"}
                        className={"w-fit mx-10"}
                        name={"img"}
                        accept={"image/png, image/jpeg, image/jpg, image/webp"}
                    />
                </div>
            </form>

        </div>
    )
}

export default EditArticleModal;