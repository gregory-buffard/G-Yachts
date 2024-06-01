"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { CreateNewsletterDialog } from "./createNewsletterDialog";
import { Newsletter, NewsletterItem } from "./newsletterItem";
import { NewsletterContent } from "./newsletterContent";

const newsletterItems: Newsletter[] = [
    {
        title: "Newsletter 1",
        htmlContent: "This is the first newsletter"
    },
    {
        title: "Newsletter 2",
        htmlContent: "This is the second newsletter"
    },
]

const NewsletterPage = (): JSX.Element => {
    const [selectedItem, setSelectedItem] = useState<Newsletter | null>(null);

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const toggleCreateModal = () => setCreateModalOpen(!createModalOpen);

    return (
        <section
            className={
                "w-full h-full flex flex-col gap-10 lg:justify-start p-10 lg:items-start justify-center items-center"
            }
        >
            <h1 className={"max-md:self-center mt-4"}>Newsletter</h1>

            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-5">
                    <Button onClick={toggleCreateModal}>
                        Create new template
                    </Button>

                    <div className="flex flex-col gap-4">
                        {newsletterItems.map(item => (
                            <NewsletterItem
                                item={item}
                                onClick={() => setSelectedItem(item)}
                            />
                        ))}
                    </div>
                </div>

                <NewsletterContent item={selectedItem ?? newsletterItems[0]} />
            </div>

            <CreateNewsletterDialog
                createModalOpen={createModalOpen}
                setCreateModalOpen={setCreateModalOpen}
                onCreateNewsletter={(newsletter) => {
                    alert(JSON.stringify(newsletter));
                }}
            />
        </section>
    )
}

export default NewsletterPage;