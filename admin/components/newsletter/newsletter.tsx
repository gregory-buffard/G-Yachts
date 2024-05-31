"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, toggle } from "@nextui-org/react";
import { useState } from "react";

export type Newsletter = {
    title: string;
    htmlContent: string;
}

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

const NewsletterItem = ({
    item,
    onClick
}: {
    item: Newsletter,
    onClick: VoidFunction
}) => {
    return (
        <Button
            type="button"
            variant="faded"
            className="flex flex-col gap-5"
            onClick={onClick}
        >
            <h2>{item.title}</h2>
        </Button>
    )
}

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

                <div>
                    {selectedItem?.htmlContent}
                </div>
            </div>

            <Modal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    )
}

export default NewsletterPage;