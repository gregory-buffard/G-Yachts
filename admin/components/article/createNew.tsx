"use client"
import {Input} from "@nextui-org/input";
import {Button, ButtonGroup, Tab, Tabs, Textarea} from "@nextui-org/react";
import {useState} from "react";
import {Card, CardBody} from "@nextui-org/card";
import {createBrokerino} from "@/actions/brokerino";
import {createArticle} from "@/actions/article";
import {reader} from "next/dist/experimental/testmode/fetch";

const CreateNew = () => {
    const [enArticle, setEnArticle] = useState<any>({})
    const [frArticle, setFrArticle] = useState<any>({})
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
            <h2>Create New Article</h2>
            <Tabs aria-label="Dynamic tabs" items={tabs}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        <Card>
                            <CardBody className={"gap-3"}>
                                <Input
                                    label={"Headline"}
                                    placeholder={"Headline"}
                                    value={item.label === "EN" ? enArticle.title : frArticle.title}
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
                        await createArticle({
                            date: Date.now().toString(),
                            en: {...enArticle},
                            fr: {...frArticle},
                            heroImage: reader.result as string
                        });
                    };
                }}
            >
                <div className={"w-full h-fit flex justify-around items-center flex-row"}>
                    <Button type={"submit"} onClick={() => {
                        console.log(enArticle, frArticle)
                    }}>Create</Button>
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


export default CreateNew;