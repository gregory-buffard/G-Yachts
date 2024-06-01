"use client";

import { ICustomer } from "@/types/customer";
import { Message } from "./message";

const messages: ICustomer[] = [
    {
        name: "John Doe",
        email: "dornicakkuba@gmail.com",
        tel: "1234567890",
        message: "Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house.Hello, I am interested in buying a house. Hello, I am interested in buying a house.Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house.",
        inquiry: {
            buying: true,
            selling: false,
            chartering: false,
            other: false,
        },
        newsletter: true,
        status: "unread",
    },
    {
        name: "John Doe",
        email: "dornicakkuba@gmail.com",
        tel: "1234567890",
        message: "Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house.Hello, I am interested in buying a house. Hello, I am interested in buying a house.Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house. Hello, I am interested in buying a house.",
        inquiry: {
            buying: true,
            selling: false,
            chartering: false,
            other: false,
        },
        newsletter: true,
        status: "unread",
    },
]

const UnclaimedPanel = () => {
    return (
        <div className="flex flex-col gap-6">
            <h2>Unclaimed</h2>

            <div className="grid grid-cols-1 gap-4">
                {messages.map(item => (
                    <Message
                        customer={item}
                        toBeClaimed={false}
                        onClaim={() => { }}
                        onFinish={() => { }}
                        onRemove={() => { }}
                    />
                ))}
            </div>
        </div>
    )
}

const ClaimedPanel = () => {
    return (
        <div className="flex flex-col gap-6">
            <h2>Unclaimed</h2>

            <div className="flex flex-col gap-5">
                {messages.map(item => (
                    <Message
                        customer={item}
                        toBeClaimed={false}
                        onClaim={() => { }}
                        onFinish={() => { }}
                        onRemove={() => { }}
                    />
                ))}
            </div>
        </div>
    )
}

const MessagesPage = () => {
    return (
        <section
            className={
                "w-full h-full flex flex-col gap-10 lg:justify-start p-10 lg:items-start justify-center items-center"
            }
        >
            <h1 className={"max-md:self-center mt-4"}>Messages</h1>

            <div className="flex flex-row gap-5 justify-between">
                <UnclaimedPanel />
                <ClaimedPanel />
            </div>
        </section>
    )
}

export default MessagesPage;