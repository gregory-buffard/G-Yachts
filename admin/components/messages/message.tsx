import { ICustomer } from "@/types/customer"
import { Button, Chip } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export const Message = ({
    customer,
    toBeClaimed,
    onClaim,
    onFinish,
    onRemove
}: {
    customer: ICustomer;
    toBeClaimed: boolean;
    onClaim?: VoidFunction;
    onFinish?: VoidFunction;
    onRemove?: VoidFunction;
}) => {
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
                    <Button onClick={onClaim} variant="flat" color="success">
                        Claim
                    </Button>
                ) : (
                    <Button onClick={onFinish} variant="flat" color="success">
                        Finish
                    </Button>
                )}

                <Button
                    variant="faded"
                    onClick={onRemove}
                >
                    Remove
                </Button>
            </div>
        </section >
    )
}