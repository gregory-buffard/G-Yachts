import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export const WarningMessageDeleteDialog = ({
    onDelete,
    isOpen,
    onClose,
}: {
    onDelete: VoidFunction;
    isOpen?: boolean;
    onClose: VoidFunction;
}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Delete this message?</ModalHeader>

                        <ModalBody>
                            <p>
                                Do you really want to delete this record?
                                This action cannot be undone and the message will be lost forever.
                            </p>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" variant="bordered" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="danger" onPress={onDelete}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}