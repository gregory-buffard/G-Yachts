import { ICustomer } from "@/types/customer"
import { Button, Chip } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useState } from "react";
import { WarningMessageDeleteDialog } from "./warningMessageDeleteDialog";
import { claimCustomer, finishCustomer, removeCustomer } from "@/actions/customers";

export const Message = ({
    customer,
    toBeClaimed,
    onRefetch,
}: {
    customer: ICustomer;
    toBeClaimed: boolean;
    onRefetch: VoidFunction;
}) => {
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const toggleDeleteOpen = () => setDeleteOpen(!deleteOpen);

    const [claiming, setClaiming] = useState<boolean>(false);
    const onClaim = async () => {
        setClaiming(true);
        await claimCustomer(customer._id);
        setClaiming(false);
        onRefetch();
    }

    const [removing, setRemoving] = useState<boolean>(false);
    const onRemove = async () => {
        setRemoving(true);
        await removeCustomer(customer._id);
        setRemoving(false);
        onRefetch();
    }

    const [finishing, setFinishing] = useState<boolean>(false);
    const onFinish = async () => {
        setFinishing(true);
        await finishCustomer(customer._id);
        setFinishing(false);
        onRefetch();
    }

    return (
        <section className="border-2 border-gray-300 rounded-lg p-4">
            <div className="flex flex-row gap-3">
                <h4>{customer.name}</h4>
                {customer.newsletter && (
                    <Chip
                        variant="solid"
                        className="text-white"
                        color="success"
                        size="sm"
                    >
                        <div className="flex flex-row gap-1">
                            <IoIosMail size={15} />
                            Subscribed newsletter
                        </div>
                    </Chip>
                )}
            </div>

            <div className="flex flex-col gap-0.5 my-2.5">
                <a
                    href={`mailto:${customer.email}`}
                    className="flex flex-row gap-1 text-gray-500"
                >
                    <MdOutlineAlternateEmail fontSize={21} />
                    {customer.email}
                </a>

                <a
                    href={`tel:${customer.tel}`}
                    className="flex flex-row gap-1 text-gray-500"
                >
                    <FaPhone />
                    {customer.tel}
                </a>
            </div>

            <div className="bg-white rounded-lg p-2">
                <p>{customer.message}</p>
            </div>

            <div className="flex flex-row gap-1.5 mt-4">
                {toBeClaimed ? (
                    <Button
                        isLoading={claiming}
                        onClick={onClaim}
                        variant="flat"
                        color="success"
                    >
                        Claim
                    </Button>
                ) : (
                    <Button
                        isLoading={finishing}
                        onClick={onFinish}
                        variant="flat"
                        color="success"
                    >
                        Finish
                    </Button>
                )}

                <Button
                    variant="faded"
                    onClick={onRemove}
                    isLoading={removing}
                >
                    Remove
                </Button>
            </div>

            <WarningMessageDeleteDialog
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onDelete={() => { }}
            />
        </section >
    )
}