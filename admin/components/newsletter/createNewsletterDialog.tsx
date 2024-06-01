"use client";

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Newsletter } from "./newsletterItem";

export const CreateNewsletterDialog = ({
    createModalOpen,
    setCreateModalOpen,
    onCreateNewsletter
}: {
    createModalOpen: boolean;
    setCreateModalOpen: (open: boolean) => void;
    onCreateNewsletter: (newsletter: Newsletter) => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Newsletter>();

    const onSubmit: SubmitHandler<Newsletter> = (data) => {
        onCreateNewsletter(data);
        setCreateModalOpen(false);
    }

    return (
        <Modal
            isOpen={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Create new newsletter template
                        </ModalHeader>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalBody>
                                <Input
                                    label="Title"
                                    {...register("title", { required: true })}
                                    errorMessage={errors.title ? "This field is required" : ""}
                                />
                                <Textarea
                                    label="HTML Content"
                                    {...register("htmlContent", { required: true })}
                                    errorMessage={errors.htmlContent ? "This field is required" : ""}
                                />
                            </ModalBody>

                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button type="submit" color="primary">
                                    Create
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}