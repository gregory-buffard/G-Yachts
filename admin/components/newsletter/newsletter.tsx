"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CreateNewsletterDialog } from "./createNewsletterDialog";
import { NewsletterContent } from "./newsletterContent";
import { NewsletterList } from "./newsletterList";
import { NewsletterI } from "@/types/newsletter";
import { getNewsletters } from "@/actions/newsletter";

const NewsletterPage = (): JSX.Element => {
    const [selectedItem, setSelectedItem] = useState<NewsletterI | null>(null);

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const toggleCreateModal = () => setCreateModalOpen(!createModalOpen);

    const [newsletterItems, setNewsletterItems] = useState<NewsletterI[]>([]);

    const fetchNewsletters = async () => {
        const newsletters = await getNewsletters();
        setNewsletterItems(newsletters);
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: Will cause an infinite loop if dependencies are added
    useEffect(() => {
        fetchNewsletters();
    }, []);

    return (
        <section
            className={
                "w-full h-full flex flex-col gap-10 lg:justify-start p-10 lg:items-start justify-center items-center"
            }
        >
            <h1 className={"max-md:self-center mt-4"}>Newsletter</h1>

            <div className="flex flex-col lg:flex-row gap-10 lg:w-full w-[400px]">
                <div className="flex flex-col gap-5">
                    <Button onClick={toggleCreateModal}>
                        Create new template
                    </Button>

                    <NewsletterList
                        newsletterItems={newsletterItems}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                </div>

                <NewsletterContent
                    item={selectedItem}
                    onUpdate={() => fetchNewsletters()}
                />
            </div>

            <div className="lg:w-full w-[400px]">
                <CreateNewsletterDialog
                    createModalOpen={createModalOpen}
                    setCreateModalOpen={setCreateModalOpen}
                    onCreateNewsletter={() => fetchNewsletters()}
                />
            </div>
        </section>
    )
}

export default NewsletterPage;