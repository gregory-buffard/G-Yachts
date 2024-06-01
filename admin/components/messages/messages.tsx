"use client";

import { ICustomer } from "@/types/customer";
import { Message } from "./message";
import { useEffect, useState } from "react";
import { getCustomers } from "@/actions/customers";

const UnclaimedPanel = ({ customers, onRefetch }: {
    customers: ICustomer[];
    onRefetch: VoidFunction;
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-0.5">
                <h2>Unclaimed</h2>
                <p>Here are all your unclaimed messages.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {customers.map(item => (
                    <Message
                        customer={item}
                        toBeClaimed={true}
                        onRefetch={onRefetch}
                    />
                ))}
            </div>
        </div>
    )
}

const ClaimedPanel = ({ customers, onRefetch }: {
    customers: ICustomer[];
    onRefetch: VoidFunction;
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-0.5">
                <h2>Claimed</h2>
                <p>Here are all your claimed unfinished messages.</p>
            </div>

            <div className="flex flex-col gap-5">
                {customers.map(item => (
                    <Message
                        customer={item}
                        toBeClaimed={false}
                        onRefetch={onRefetch}
                    />
                ))}
            </div>
        </div>
    )
}

const MessagesPage = () => {
    const [messages, setMessages] = useState<ICustomer[]>([]);

    const fetchCustomers = async () => {
        const customers = await getCustomers();
        setMessages(customers as unknown as ICustomer[]);
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: Would cause an infinite loop
    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <section
            className={
                "w-full h-screen overflow-auto flex flex-col gap-10 lg:justify-start p-10 lg:items-start justify-center items-center"
            }
        >
            <div className="flex flex-col gap-1.5">
                <h1 className={"max-md:self-center mt-4"}>Messages</h1>
                <p>Dashboard to manage messages/orders from potentional customers</p>
            </div>

            <div className="flex flex-row gap-5 justify-between">
                <UnclaimedPanel
                    customers={messages.filter(({ status }) => status === "unclaimed")}
                    onRefetch={() => fetchCustomers()}
                />
                <ClaimedPanel
                    customers={messages.filter(({ status }) => status === "claimed")}
                    onRefetch={() => fetchCustomers()}
                />
            </div>
        </section>
    )
}

export default MessagesPage;